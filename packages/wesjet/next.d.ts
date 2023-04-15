import type { NextConfig } from 'next'
import { type NextPluginOptions } from './dist/next/validate/plugin'

export * from './dist/next/_jsx_'
export * from './dist/next/lib/mdx'
export * from './dist/next/lib/reload'

export type { NextConfig }

export declare const defaultPluginOptions: NextPluginOptions

export declare const createWesjetPlugin: (
  pluginOptions?: NextPluginOptions,
) => (nextConfig?: Partial<NextConfig>) => Partial<NextConfig>

export declare const wesjetConfig: (nextConfig?: Partial<NextConfig>) => Partial<NextConfig>
