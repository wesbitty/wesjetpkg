/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @dimejiSR
 */

import fs from 'fs'

export function makeDir(root: string, options = { recursive: true }): Promise<void> {
  return fs.promises.mkdir(root, options)
}
