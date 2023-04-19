/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import { errorToString } from '@wesjet/function.js'
import { Tagged } from '@wesjet/function.js/effect'

export class UnknownContentfulError extends Tagged('UnknownContentfulError')<{
  readonly error: unknown
}> {
  toString = () => `UnknownContentfulError: ${errorToString(this.error)}`
}
