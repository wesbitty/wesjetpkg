/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import { unknownToAbsolutePosixFilePath } from '@wesjet/function.js'
import type { Has } from '@wesjet/function.js/effect'
import { T, tag } from '@wesjet/function.js/effect'

const CwdSymbol = Symbol()

export const makeCwd = T.gen(function* (_) {
  const cwd = yield* _(
    T.succeedWith(() => {
      const cwdValue = process.env.PWD ?? process.cwd()
      return unknownToAbsolutePosixFilePath(cwdValue)
    }),
  )

  return { serviceId: CwdSymbol, cwd } as const
})

export interface Cwd extends T.OutputOf<typeof makeCwd> {}
export const Cwd = tag<Cwd>()

export const provideCwd = T.provideServiceM(Cwd)(makeCwd)

export const getCwd = T.accessService(Cwd)((_) => _.cwd)

export type HasCwd = Has<Cwd>
