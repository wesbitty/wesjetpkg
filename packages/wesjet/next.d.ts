/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { NextConfig } from 'next'
import { type NextPluginOptions } from './dist/next/validate/plugin.js'

export * from './dist/next/_jsx_.cjs'
export * from './dist/next/lib/mdx.js'
export * from './dist/next/lib/reload.js'

export type { NextConfig }

export declare const defaultPluginOptions: NextPluginOptions

export declare const createWesjetPlugin: (
  pluginOptions?: NextPluginOptions,
) => (nextConfig?: Partial<NextConfig>) => Partial<NextConfig>

export declare const wesjetConfig: (nextConfig?: Partial<NextConfig>) => Partial<NextConfig>
