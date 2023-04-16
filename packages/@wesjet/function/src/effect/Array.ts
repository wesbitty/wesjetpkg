/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @dimejiSR
 */

import { Array, pipe } from '@effect-ts/core'

import * as O from './Option'

export * from '@effect-ts/core/Collections/Immutable/Array'

export const headUnsafe = <A>(array: Array.Array<A>): A => pipe(array, Array.head, O.getUnsafe)
