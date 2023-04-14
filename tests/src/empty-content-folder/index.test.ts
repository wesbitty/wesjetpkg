import * as fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { expect, test } from 'vitest'
import * as core from 'wesjet/core'
import { defineDocumentType, makeSource } from 'wesjet/dist/maker/maker'

test('empty content folder', async () => {
  const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: '**/*.md',
    fields: {},
  }))

  const testDirPath = fileURLToPath(new URL('.', import.meta.url))

  await fs.rm(path.join(testDirPath, '.wesjet'), {
    recursive: true,
    force: true,
  })

  process.env['PWD'] = testDirPath

  const source = await makeSource({
    contentDirPath: path.join(testDirPath, 'posts'),
    documentTypes: [Post],
  })

  await core.runMain({ tracingServiceName: 'wesjet-test', verbose: false })(
    core.generateDotpkg({
      config: { source, esbuildHash: 'STATIC_HASH' },
      verbose: true,
    }),
  )

  const generatedIndexJsFile = await fs.readFile(
    path.join(testDirPath, '.wesjet', 'generated', 'Post', '_index.mjs'),
    'utf8',
  )

  expect(generatedIndexJsFile).toMatchInlineSnapshot(`
    "// NOTE This file is auto-generated by wesjet
    
    
    
    export const allPosts = []
    "
  `)

  const generatedIndexJsonFile = await fs.readFile(
    path.join(testDirPath, '.wesjet', 'generated', 'Post', '_index.json'),
    'utf8',
  )

  expect(generatedIndexJsonFile).toMatchInlineSnapshot('"[]"')
})
