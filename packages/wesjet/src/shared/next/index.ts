/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { NextConfig } from 'next'

import { type NextPluginOptions, runWesjetBuild, runWesjetDev } from './validate/plugin.js'
import { packageManagerVersion } from './validate/version.js'

let devServerStarted = false

export const defaultPluginOptions: NextPluginOptions = {}
export type { NextConfig }

/**
 * Next.js plugin for Wesjet with default options.
 *
 * If you want to provide custom plugin options, please use {@link createWesjetPlugin} instead.
 *
 * @example
 * ```js
 * // next.config.mjs
 * import { wesjetConfig } from 'wesjet/next'
 *
 * export default wesjetConfig({
 *   // Next.js config option
 * })
 * ```
 */
export const createWesjetPlugin =
  (pluginOptions: NextPluginOptions = defaultPluginOptions) =>
  (nextConfig: Partial<NextConfig> = {}): Partial<NextConfig> => {
    const isNextDev =
      process.argv.includes('dev') ||
      process.argv.some((_) => _.endsWith('bin/next') || _.endsWith('bin\\next'))

    const isBuild = process.argv.includes('build')

    const { configPath } = pluginOptions

    return {
      ...nextConfig,
      redirects: async () => {
        if (isBuild) {
          packageManagerVersion()
          await runWesjetBuild({ configPath })
        } else if (isNextDev && !devServerStarted) {
          devServerStarted = true

          runWesjetDev({ configPath })
        }

        return nextConfig.redirects?.() ?? []
      },
      onDemandEntries: {
        maxInactiveAge: 60 * 60 * 1000, // extend `maxInactiveAge` to 1 hour (from 15 sec by default)
        ...nextConfig.onDemandEntries, // use existing onDemandEntries config if provided by user
      },
      webpack(config: any, options: any) {
        config.watchOptions = {
          ...config.watchOptions,
          // ignored: /node_modules([\\]+|\/)+(?!\.wesjet)/,
          ignored: ['**/node_modules/!(.wesjet)/**/*'],
        }

        config.module.rules.push({
          test: /\.m?js$/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false,
          },
        })

        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options)
        }

        return config
      },
    }
  }

/**
 * Next.js plugin for Wesjet with default options.
 *
 * If you want to provide custom plugin options, please use {@link createWesjetPlugin} instead.
 *
 * @example
 * ```js
 * // next.config.mjs
 * import { wesjetConfig } from 'wesjet/next'
 *
 * export default wesjetConfig({
 *   // Next.js config option
 * })
 * ```
 */
export const wesjetConfig = createWesjetPlugin(defaultPluginOptions)
