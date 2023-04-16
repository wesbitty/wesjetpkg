/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @dimejiSR
 */

import { Option } from '@effect-ts/core'

export * from '@effect-ts/core/Option'

export const getUnsafe = <A>(option: Option.Option<A>): A => {
  if (Option.isSome(option)) {
    return option.value
  }

  throw new Error('Option.getUnsafe: Option is None')
}
