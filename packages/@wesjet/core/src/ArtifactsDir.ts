/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @dimejiSR
 */

import type { AbsolutePosixFilePath, RelativePosixFilePath } from '@wesjet/function.js'
import { filePathJoin } from '@wesjet/function.js'
import type { OT } from '@wesjet/function.js/effect'
import { pipe, T } from '@wesjet/function.js/effect'
import type { GetWesjetVersionError } from '@wesjet/function.js/node'
import { fs, getWesjetVersion } from '@wesjet/function.js/node'

import type { HasCwd } from './cwd.js'
import { getCwd } from './cwd.js'
// import utilsPkg from '@wesjet/function.js/package.json'

export namespace ArtifactsDir {
  export const getDirPath = ({ cwd }: { cwd: AbsolutePosixFilePath }): AbsolutePosixFilePath =>
    filePathJoin(cwd, '.wesjet' as AbsolutePosixFilePath)

  export const mkdir: T.Effect<OT.HasTracer & HasCwd, fs.MkdirError, AbsolutePosixFilePath> = T.gen(
    function* ($) {
      const cwd = yield* $(getCwd)
      const dirPath = getDirPath({ cwd })

      yield* $(fs.mkdirp(dirPath))

      return dirPath
    },
  )

  export const getCacheDirPath: T.Effect<
    OT.HasTracer & HasCwd,
    GetWesjetVersionError,
    AbsolutePosixFilePath
  > = pipe(
    T.struct({
      wesjetVersion: getWesjetVersion(),
      cwd: getCwd,
    }),
    T.map(({ wesjetVersion, cwd }) =>
      filePathJoin(
        getDirPath({ cwd }),
        'cache' as RelativePosixFilePath,
        `v${wesjetVersion}` as RelativePosixFilePath,
      ),
    ),
  )

  export const mkdirCache: T.Effect<
    OT.HasTracer & HasCwd,
    fs.MkdirError | GetWesjetVersionError,
    AbsolutePosixFilePath
  > = pipe(getCacheDirPath, T.tap(fs.mkdirp))
}
