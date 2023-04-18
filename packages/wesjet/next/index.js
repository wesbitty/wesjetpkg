/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 *
 */

import { checkConstraints } from '../dist/next/validate/check-constraints.js'
import { runWesjetBuild, runWesjetDev } from '../dist/next/validate/plugin.js'

let devServerStarted = false

export const defaultPluginOptions = {}

export const createWesjetPlugin =
  (pluginOptions = defaultPluginOptions) =>
  (nextConfig = {}) => {
    // could be either `next dev` or just `next`
    const isNextDev =
      process.argv.includes('dev') ||
      process.argv.some((_) => _.endsWith('bin/next') || _.endsWith('bin\\next'))
    const isBuild = process.argv.includes('build')
    const { configPath } = pluginOptions
    return {
      ...nextConfig,
      redirects: async () => {
        if (isBuild) {
          checkConstraints()
          await runWesjetBuild({ configPath })
        } else if (isNextDev && !devServerStarted) {
          devServerStarted = true
          runWesjetDev({ configPath })
        }
        return nextConfig.redirects?.() ?? []
      },
      onDemandEntries: {
        maxInactiveAge: 60 * 60 * 1000,
        ...nextConfig.onDemandEntries, // use existing onDemandEntries config if provided by user
      },
      webpack(config, options) {
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

export const wesjetConfig = createWesjetPlugin(defaultPluginOptions)
