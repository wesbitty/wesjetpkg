/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import type * as unified from 'unified'

import type { RawDocumentData } from '../types/data.js'

/**
 * Unified plugin that adds the raw document data to the vfile under `vfile.data.rawDocumentData`
 *
 * wesjet uses this plugin by default.
 */
export const addRawDocumentToVFile =
  (rawDocumentData: RawDocumentData) => (): unified.Transformer => (_, vfile) => {
    Object.assign(vfile.data, { rawDocumentData })
  }
