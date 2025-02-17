/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import type { RelativePosixFilePath } from '@wesjet/function.js'
import type { Has } from '@wesjet/function.js/effect'
import { HashMap, O, pipe, State, T, Tagged } from '@wesjet/function.js/effect'

type DocumentTypeName = string

export class DocumentTypeMap extends Tagged('@local/DocumentTypeMap')<{
  readonly map: HashMap.HashMap<DocumentTypeName, RelativePosixFilePath[]>
}> {
  static init = () => new DocumentTypeMap({ map: HashMap.make() })

  add = (documentTypeName: DocumentTypeName, filePath: RelativePosixFilePath) => {
    const oldPaths = pipe(
      HashMap.get_(this.map, documentTypeName),
      O.getOrElse(() => []),
    )

    return new DocumentTypeMap({
      map: HashMap.set_(this.map, documentTypeName, [...oldPaths, filePath]),
    })
  }

  getFilePaths = (documentTypeName: DocumentTypeName): O.Option<RelativePosixFilePath[]> =>
    HashMap.get_(this.map, documentTypeName)
}

/**
 * This state is needed for certain kinds of error handling (e.g. to check if singleton documents have been provided)
 */
export const DocumentTypeMapState = State.State<DocumentTypeMap>(DocumentTypeMap._tag)

export const provideDocumentTypeMapState = T.provideSomeLayer(
  DocumentTypeMapState.Live(DocumentTypeMap.init()),
)

export type HasDocumentTypeMapState = Has<State.State<DocumentTypeMap>>
