/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */
import { expect, test } from 'vitest'

import { convertSchema } from '../cli/convert.js'
import { toYamlString } from '../cli/utils.js'
import * as fixtures from './fixtures/index.js'

test('azimuth schema', async () => {
  const coreSchema = await fixtures.makeAzimuthSchema()
  expect(coreSchema).toMatchSnapshot()
  const stackbitConfig = toYamlString(convertSchema(coreSchema, {}))
  expect(stackbitConfig).toMatchSnapshot()
})

test('blog schema', async () => {
  const coreSchema = await fixtures.makeBlogSchema()
  expect(coreSchema).toMatchSnapshot()
  const stackbitConfig = toYamlString(convertSchema(coreSchema, {}))
  expect(stackbitConfig).toMatchSnapshot()
})
