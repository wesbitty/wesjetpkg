/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import path from 'path'

import type { AbsolutePosixFilePath } from '@wesjet/function.js'
import { filePathJoin } from '@wesjet/function.js'
import { Chunk, O, OT, pipe, T, Tagged } from '@wesjet/function.js/effect'
import { fs } from '@wesjet/function.js/node'
import { parse as parseJsonc } from 'comment-json'

import { getCwd } from './WesjetCwd.js'

export const validateTsconfig = pipe(
  T.gen(function* ($) {
    const cwd = yield* $(getCwd)

    const possibleFileNames = ['tsconfig.json', 'jsconfig.json'].map((_) => filePathJoin(cwd, _))

    const tsconfigOption = yield* $(
      pipe(
        possibleFileNames,
        T.forEachPar(tryParseFile),
        T.map(Chunk.toArray),
        T.map((_) => O.getFirst(..._)),
      ),
    )

    const warningMessage = (msg: string) =>
      T.log(`\
wesjet (Warning): Importing from \`wesjet\/static\` might not work.
${msg}

For more information see https://www.wesbitty.org/product/wesjet
To disable this warning you can set \`disableImportAliasWarning: true\` in your wesjet configuration preset.
`)

    if (O.isNone(tsconfigOption)) {
      yield* $(warningMessage(`No tsconfig.json or jsconfig.json file found`))

      return
    }

    const { config, fileName } = tsconfigOption.value

    if (config.compilerOptions?.baseUrl === undefined) {
      yield* $(
        warningMessage(`Config option \`compilerOptions.baseUrl\` not found in "${fileName}".`),
      )
      return
    }

    if (config.compilerOptions?.paths === undefined) {
      yield* $(
        warningMessage(`Config option \`compilerOptions.paths\` not found in "${fileName}".`),
      )
      return
    }

    const paths = Object.values(config.compilerOptions.paths).flat() as string[]
    if (!paths.some((_) => _.includes('./.wesjet/static'))) {
      yield* $(
        warningMessage(
          `No path alias found for "wesjet/static" via \`compilerOptions.paths\` in "${fileName}".`,
        ),
      )
    }
  }),
  OT.withSpan('validateTsconfig'),
)

const tryParseFile = (filePath: AbsolutePosixFilePath) =>
  pipe(
    fs.readFile(filePath),
    T.chain((contents) =>
      T.tryCatch(
        () => parseJsonc(contents, undefined, true),
        (error) => new InvalidTsconfigError({ error }),
      ),
    ),
    T.map((config: any) => ({ fileName: path.basename(filePath), config })),
    T.tapError((error) =>
      T.succeedWith(() => {
        if (error._tag === 'InvalidTsconfigError' || error._tag === 'node.fs.ReadFileError') {
          console.log(`wesjet: invalid jsconfig/tsconfig file found: ${filePath}`)
        }
      }),
    ),
    T.option,
  )

export class InvalidTsconfigError extends Tagged('InvalidTsconfigError')<{
  readonly error: any
}> {}
