import { provideJaegerTracing } from '@wesjet/function.js'
import { pipe, provideConsole, T } from '@wesjet/function.js/effect'
import type { DocumentType } from 'wesjet/dist/preset'
import { makeSource } from 'wesjet/dist/preset'

import * as azimuth from './azimuth-schema/index.js'
import * as blog from './blog-schema/index.js'

export const makeAzimuthSchema = () => makeSchema(azimuth)
export const makeBlogSchema = () => makeSchema(blog)

const esbuildHash = 'not-important-for-this-test'

const makeSchema = (documentTypes: Record<string, DocumentType<any>>) =>
  pipe(
    T.tryPromise(() => makeSource({ documentTypes, contentDirPath: '' })),
    T.chain((source) => source.provideSchema(esbuildHash)),
    provideJaegerTracing('wesjet/cli'),
    provideConsole,
    T.runPromise,
  )
