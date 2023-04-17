/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import type * as core from '@wesjet/core'
import { T } from '@wesjet/function.js/effect'
import * as zod from 'zod'

import { FetchDataError } from '../../errors/index.js'
import type { HasDocumentContext } from '../DocumentContext.js'

const ParsedImageData = zod.object({
  src: zod.string(),
  alt: zod.string().optional(),
})

const ImageData = zod.union([zod.string(), ParsedImageData]).transform((_) => {
  if (typeof _ === 'string') {
    return { src: _ }
  }
  return _
})

const codecMap = {
  boolean: zod.boolean(),
  number: zod.number(),
  string: zod.string(),
  date: zod.string(), // NOTE date parsing is handled in `field-date.ts`
  enum: zod.string(), // TODO
  image: ImageData,
  json: zod.any(),
  list: zod.array(zod.any()),
  list_polymorphic: zod.array(zod.any()),
  markdown: zod.string(),
  mdx: zod.string(),
  nested: zod.record(zod.any()),
  nested_polymorphic: zod.record(zod.any()),
  nested_unnamed: zod.record(zod.any()),
  reference: zod.string(),
  reference_polymorphic: zod.string(),
}

export type ParsedFieldData<TFieldType extends core.FieldDefType> = zod.infer<
  (typeof codecMap)[TFieldType]
>

export const parseFieldData = <TFieldType extends core.FieldDefType>({
  rawData,
  fieldType,
  fieldName,
}: {
  rawData: unknown
  fieldType: TFieldType
  /** Only needed for error handling */
  fieldName: string
}): T.Effect<
  HasDocumentContext,
  FetchDataError.IncompatibleFieldDataError,
  ParsedFieldData<TFieldType>
> => {
  const result = codecMap[fieldType].safeParse(rawData)

  if (result.success) {
    return T.succeed(result.data)
  } else {
    return FetchDataError.IncompatibleFieldDataError.fail({
      incompatibleFieldData: [[fieldName, rawData]],
    })
  }
}
