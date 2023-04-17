/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import type { Document, NestedDocument } from './types/data.js'
import type { DataCache } from './WesjetCache.js'

// export type WesjetTypesGenerated = WesjetGen extends { documentTypeMap: any, objectTypeMap: any } ? true : false

export type GetDocumentTypeMapGen<TDocument extends Document> = WesjetGen extends {
  documentTypeMap: infer T
}
  ? T
  : Record<string, TDocument>

export type GetDocumentTypeGen<
  Name extends string,
  TDocument extends Document,
> = Name extends keyof GetDocumentTypeMapGen<TDocument>
  ? GetDocumentTypeMapGen<TDocument>[Name]
  : Document

export type GetDocumentTypesGen = WesjetGen extends { documentTypes: infer T } ? T : Document

export type GetDocumentTypeNamesGen = WesjetGen extends {
  documentTypeNames: infer T
}
  ? T
  : string

export type GetNestedTypeMapGen = WesjetGen extends { objectTypeMap: infer T }
  ? T
  : Record<string, NestedDocument>
export type GetNestedTypeGen<Name extends string> = Name extends keyof GetNestedTypeMapGen
  ? GetNestedTypeMapGen[Name]
  : NestedDocument
export type GetNestedTypesGen = WesjetGen extends { objectTypes: infer T } ? T : NestedDocument
export type GetNestedTypeNamesGen = WesjetGen extends {
  objectTypeNames: infer T
}
  ? T
  : string

export type GetAllTypeNamesGen = WesjetGen extends { allTypeNames: infer T } ? T : string

export type GetFieldNamesForDefinitionGen<DefName extends string> =
  DefName extends keyof GetDocumentTypeMapGen<Document>
    ? keyof GetDocumentTypeGen<DefName, Document>
    : keyof GetNestedTypeGen<DefName>

declare global {
  // NOTE will be extended via `$YOUR_PROJECT/.wesjet/static/types.d.ts`
  interface WesjetGen {
    // documentTypes: DocumentTypes
    // documentTypeMap: DocumentTypeMap
    // documentTypeNames: DocumentTypeNames
    // nestedTypes: NestedTypes
    // nestedTypeMap: NestedTypeMap
    // nestedTypeNames: NestedTypeNames
    // allTypeNames: AllTypeNames
  }
}

export type CacheGen = Omit<DataCache.Cache, 'documents'> & {
  documents: DocumentGen[]
}

export type DocumentGen = GetDocumentTypesGen
