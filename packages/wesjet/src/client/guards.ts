/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Document, GetDocumentTypeMapGen, GetDocumentTypeNamesGen } from '@wesjet/core'

type TypeNameOneOrMany = GetDocumentTypeNamesGen | GetDocumentTypeNamesGen[]

type TypeForTypeNameOneOrMany<N extends TypeNameOneOrMany> = N extends GetDocumentTypeNamesGen
  ? GetDocumentTypeMapGen<Document>[N]
  : N extends GetDocumentTypeNamesGen[]
  ? GetDocumentTypeMapGen<Document>[N[number]]
  : never

function is<N extends TypeNameOneOrMany>(typeName: N, _: any): _ is TypeForTypeNameOneOrMany<N>

function is<N extends TypeNameOneOrMany>(typeName: N): (_: any) => _ is TypeForTypeNameOneOrMany<N>

function is<N extends TypeNameOneOrMany>(typeName: N, _?: any): any {
  if (_) {
    if (Array.isArray(typeName)) {
      // TODO make type field name dynamic (probably will require to code-gen the guard function)
      return typeName.some((typeName_) => _?.type === typeName_)
    } else {
      return typeName === _?.type
    }
  } else {
    return (_: any) => is(typeName, _)
  }
}

export const isType = is

export const guards = {
  is,
  hasField,
}

type AllPropertyNames<X> = keyof UnionToIntersection<X>
function hasField<T extends {}, P extends AllPropertyNames<T>>(
  _: T,
  property: P,
): _ is T & Record<P, any> {
  return _.hasOwnProperty(property)
}

// function withField<T extends {}, P extends AllPropertyNames<T>>(
//   _: T,
//   propertyName: P,
// ): (T & Record<P, any>) | undefined {
//   return hasField<T, P>(_, propertyName) ? _ : undefined
// }

// type FlattenUnion<T> = {
//   [K in keyof UnionToIntersection<T>]: K extends keyof T
//     ? T[K] extends any[]
//       ? T[K]
//       : T[K] extends object
//       ? FlattenUnion<T[K]>
//       : T[K]
//     : UnionToIntersection<T>[K] | undefined
// }

type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any
  ? R
  : never
