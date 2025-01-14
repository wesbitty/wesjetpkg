/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import { xxhash64 } from 'hash-wasm'
import type { JsonValue } from 'type-fest'

import { T, Tagged } from './effect/index.js'

export const hashObject = (obj: JsonValue | any): T.Effect<unknown, HashError, string> => {
  return T.tryCatchPromise(
    () => xxhash64(stringifyIfNeeded(obj)),
    (error) => new HashError({ error }),
  )
}

export class HashError extends Tagged('HashError')<{
  readonly error: unknown
}> {}

const stringifyIfNeeded = (_: JsonValue | any) => (typeof _ === 'string' ? _ : JSON.stringify(_))
