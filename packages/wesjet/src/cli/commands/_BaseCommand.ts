/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @dimejiSR
 */

import type { HasCwd } from '@wesjet/core'
import * as core from '@wesjet/core'
import type { HasClock, HasConsole, OT } from '@wesjet/function.js/effect'
import { pipe, T } from '@wesjet/function.js/effect'
import { fs } from '@wesjet/function.js/node'
import { Command, Option } from 'clipanion'
import * as t from 'typanion'

export abstract class BaseCommand extends Command {
  configPath = Option.String('-c,--config', {
    description: 'Path to the config (default: wesjet.config.ts/js)',
    validator: t.isString(),
    required: false,
  })

  clearCache = Option.Boolean('--clearCache', false, {
    description: 'Whether to clear the cache before running the command',
  })

  verbose = Option.Boolean('--verbose', false, {
    description: 'More verbose logging and error stack traces',
  })

  abstract executeSafe: () => T.Effect<OT.HasTracer & HasClock & HasCwd & HasConsole, unknown, void>

  execute = () =>
    pipe(
      this.executeSafe(),
      core.runMain({
        tracingServiceName: 'wesjet/cli',
        verbose: this.verbose || process.env.CL_DEBUG !== undefined,
      }),
    )

  clearCacheIfNeeded = () => {
    const { clearCache } = this

    return T.gen(function* ($) {
      if (clearCache) {
        const cwd = yield* $(core.getCwd)
        const artifactsDir = core.ArtifactsDir.getDirPath({ cwd })
        yield* $(fs.rm(artifactsDir, { recursive: true, force: true }))
        yield* $(T.log('Cache cleared successfully'))
      }
    })
  }
}
