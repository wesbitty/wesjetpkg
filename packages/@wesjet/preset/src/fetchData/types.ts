/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

export type RawContent = RawContentMarkdown | RawContentMDX | RawContentJSON | RawContentYAML

export interface RawContentMarkdown {
  readonly kind: 'markdown'
  fields: Record<string, any>
  body: string
  rawDocumentContent: string
}

export interface RawContentMDX {
  readonly kind: 'mdx'
  fields: Record<string, any>
  body: string
  rawDocumentContent: string
}

export interface RawContentJSON {
  readonly kind: 'json'
  fields: Record<string, any>
}

export interface RawContentYAML {
  readonly kind: 'yaml'
  fields: Record<string, any>
}
