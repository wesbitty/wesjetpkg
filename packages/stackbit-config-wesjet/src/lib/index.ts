/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @dimejiSR
 */

import type * as StackbitTypes from '@stackbit/types'

export type Transform = (config: StackbitTypes.StackbitConfig) => StackbitTypes.StackbitConfig

export const defineTransform = (transform: Transform): Transform => transform
