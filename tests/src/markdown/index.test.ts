/* eslint-disable import/no-extraneous-dependencies */
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import * as fs from 'fs/promises'
import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import { expect, test, vi } from 'vitest'
import * as core from 'wesjet/core'
import { defineDocumentType, makeSource } from 'wesjet/lib/preset'

test('markdown builder pattern', async () => {
  const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: '**/*.md',
    fields: {},
  }))

  const spyFn = vi.fn()

  const testDirPath = fileURLToPath(new URL('.', import.meta.url))

  await fs.rm(path.join(testDirPath, '.wesjet'), {
    recursive: true,
    force: true,
  })

  process.env['PWD'] = testDirPath

  const source = await makeSource({
    contentDirPath: path.join(testDirPath, 'posts'),
    documentTypes: [Post],
    markdown: (builder) => {
      builder
        .use(remarkFrontmatter)
        .use(remarkParse as any)
        .use(remark2rehype)
        .use(rehypeStringify as any)

      spyFn()
    },
  })

  await core.WesjetHook({ tracingServiceName: 'wesjet-test', verbose: false })(
    core.generateDotpkg({
      config: { source, esbuildHash: 'STATIC_HASH' },
      verbose: true,
    }),
  )

  expect(spyFn).toHaveBeenCalledOnce()
})
