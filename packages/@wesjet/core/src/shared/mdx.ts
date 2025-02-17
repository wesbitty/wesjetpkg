/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as path from 'node:path'

import { errorToString } from '@wesjet/function.js'
import { OT, pipe, T, Tagged } from '@wesjet/function.js/effect'
import * as mdxBundler from 'mdx-bundler'
import type { BundleMDXOptions } from 'mdx-bundler/dist/types'

import type { RawDocumentData } from '../types/data.js'
import type { MDXOptions } from '../WesjetPlugin.js'
import { addRawDocumentToVFile } from './unified.js'

export const bundleMDX = ({
  mdxString,
  options,
  contentDirPath,
  rawDocumentData,
}: {
  mdxString: string
  options?: MDXOptions
  contentDirPath: string
  rawDocumentData: RawDocumentData
}): T.Effect<OT.HasTracer, UnexpectedMDXError, string> =>
  pipe(
    T.gen(function* ($) {
      // TODO should be fixed in `mdx-bundler`
      if (mdxString.length === 0) {
        return ''
      }
      const {
        rehypePlugins,
        remarkPlugins,
        resolveCwd,
        cwd: cwd_,
        mdxOptions: mapMdxOptions,
        ...restOptions
      } = options ?? {}

      const getCwdFromContentDirPath = () =>
        // TODO don't use `process.cwd()` but instead `HasCwd`
        path.isAbsolute(contentDirPath) ? contentDirPath : path.join(process.cwd(), contentDirPath)

      const getRelativeCwd = () =>
        path.join(getCwdFromContentDirPath(), path.dirname(rawDocumentData.flattenedPath))

      const getCwd = () =>
        resolveCwd === 'contentDirPath' ? getCwdFromContentDirPath() : getRelativeCwd()

      if (process.env.NODE_ENV === undefined) {
        process.env.NODE_ENV = 'development'
      }

      const mdxOptions: BundleMDXOptions<any> = {
        mdxOptions: (opts) => {
          opts.rehypePlugins = [...(opts.rehypePlugins ?? []), ...(rehypePlugins ?? [])]
          opts.remarkPlugins = [
            addRawDocumentToVFile(rawDocumentData),
            ...(opts.remarkPlugins ?? []),
            ...(remarkPlugins ?? []),
          ]
          return mapMdxOptions ? mapMdxOptions(opts) : opts
        },
        // User-provided cwd trumps resolution
        cwd: cwd_ ?? getCwd(),
        // NOTE `restOptions` should be spread at the end to allow for user overrides
        ...restOptions,
      }

      const res = yield* $(
        T.tryPromise(() => mdxBundler.bundleMDX({ source: mdxString, ...mdxOptions })),
      )

      if (res.errors.length > 0) {
        return yield* $(T.fail(res.errors))
      }

      return res.code
    }),
    T.mapError((error) => new UnexpectedMDXError({ error })),
    T.tapError(() => OT.addAttribute('mdxString', mdxString)),
    OT.withSpan('@wesjet/core/shared:bundleMDX'),
  )

export class UnexpectedMDXError extends Tagged('UnexpectedMDXError')<{ readonly error: unknown }> {
  toString = () => `UnexpectedMDXError: ${errorToString(this.error)}`
}
