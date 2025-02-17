/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import * as core from '@wesjet/core'
import * as utils from '@wesjet/function.js'
import type { HasConsole, OT } from '@wesjet/function.js/effect'
import { T } from '@wesjet/function.js/effect'

import type { HasDocumentContext } from '../DocumentContext.js'
import { getFromDocumentContext } from '../DocumentContext.js'

export const makeMarkdownField = ({
  mdString,
  options,
  isDocumentBodyField,
}: {
  mdString: string
  options: core.PluginOptions
  isDocumentBodyField: boolean
}): T.Effect<
  HasDocumentContext & OT.HasTracer & HasConsole,
  core.UnexpectedMarkdownError,
  core.Markdown
> =>
  T.gen(function* ($) {
    // const isDocumentBodyField = fieldDef.name === options.fieldOptions.bodyFieldName
    const rawDocumentData = yield* $(getFromDocumentContext('rawDocumentData'))
    // NOTE for the body field, we're passing the entire document file contents to MDX (e.g. in case some remark/rehype plugins need access to the frontmatter)
    // TODO we should come up with a better way to do this
    if (isDocumentBodyField) {
      const rawContent = yield* $(getFromDocumentContext('rawContent'))
      if (rawContent.kind !== 'markdown' && rawContent.kind !== 'mdx')
        return utils.assertNever(rawContent)

      const html = yield* $(
        core.markdownToHtml({
          mdString: rawContent.rawDocumentContent,
          options: options?.markdown,
          rawDocumentData,
        }),
      )
      return { raw: mdString, html }
    } else {
      const html = yield* $(
        core.markdownToHtml({ mdString: mdString, options: options?.markdown, rawDocumentData }),
      )
      return { raw: mdString, html }
    }
  })
