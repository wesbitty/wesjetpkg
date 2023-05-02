/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 */

import type { Fetch } from './types.js'

export const resolveFetch = (customFetch?: Fetch): Fetch => {
  let _fetch: Fetch
  if (customFetch) {
    _fetch = customFetch
  } else if (typeof fetch === 'undefined') {
    _fetch = async (...args) => await (await import('cross-fetch')).fetch(...args)
  } else {
    _fetch = fetch
  }
  return (...args) => _fetch(...args)
}
