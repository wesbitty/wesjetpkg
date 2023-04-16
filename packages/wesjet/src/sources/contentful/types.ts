/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @dimejiSR
 */

import * as Contentful from 'contentful-management/types'

export { Contentful }

export type RawDocumentData = {
  sys: Contentful.EntityMetaSysProps
  metadata: Contentful.MetadataProps
}

export type PluginOptions = {
  fieldOptions?: FieldOptions
}

export type FieldOptions = {
  /**
   * Name of the field containing the body/content extracted when `contentType` is `markdown` or `mdx`.
   * @default "body"
   */
  bodyFieldName?: string
  /**
   * Name of the field containing the name of the document type (or nested document type).
   * @default "type"
   */
  typeFieldName?: string
}
