/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 */

import type { NextConfig } from 'next'

import type { NextPluginOptions } from './validate/plugin.js'

let devServerStarted = false

export type { NextConfig }

const defaultPluginOptions: NextPluginOptions = {}
module.exports.defaultPluginOptions = defaultPluginOptions

/**
 * This function allows you to provide custom plugin options (currently there are none however).
 *
 * @example
 * ```js
 * // next.config.js
 * const { createWesjetPlugin } = require('wesjet/next')
 *
 * const wesjetConfig = createWesjetPlugin({ configPath: './content/wesjet.config.ts' })
 *
 * module.exports = wesjetConfig({
 *   // Next.js config option
 * })
 * ```
 */
module.exports.createWesjetPlugin =
  (pluginOptions: NextPluginOptions = defaultPluginOptions) =>
  (nextConfig: Partial<NextConfig> = {}): Partial<NextConfig> => {
    const isNextDev =
      process.argv.includes('dev') ||
      process.argv.some((_) => _.endsWith('bin/next') || _.endsWith('bin\\next'))
    const isBuild = process.argv.includes('build')

    return {
      ...nextConfig,
      redirects: async () => {
        const { packageManagerVersion } = await import('./validate/version.js')
        packageManagerVersion()

        // NOTE since next.config.js doesn't support ESM yet, this "CJS -> ESM bridge" is needed
        const { runWesjetBuild, runWesjetDev } = await import('./validate/plugin.js')
        if (isBuild) {
          await runWesjetBuild(pluginOptions)
        } else if (isNextDev && !devServerStarted) {
          devServerStarted = true

          runWesjetDev(pluginOptions)
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
 * // next.config.js
 * const { wesjetConfig } = require('wesjet/next')
 *
 * module.exports = wesjetConfig({
 *   // Next.js config option
 * })
 * ```
 */
module.exports.wesjetConfig = module.exports.createWesjetPlugin(defaultPluginOptions)
