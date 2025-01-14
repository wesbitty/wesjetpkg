#!/usr/bin/env node

/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as core from '@wesjet/core'
import { errorToString } from '@wesjet/function.js'
import { E, pipe, S, T } from '@wesjet/function.js/effect'
import type { Usage } from 'clipanion'

import { BaseCommand } from './WesjetBaseCmd.js'

export class WesjetDev extends BaseCommand {
  static paths = [['dev']]

  static usage: Usage = {
    description: `
    Starts the application in development mode (hot-code reloading, error
        reporting, etc.) 

    Usage
        $ wesjet dev 

    Option
     -h, --help         Displays this message
    `,

    examples: [
      [`simple run`, `$ wesjet dev`],
      [`clear cache before run`, `$ wesjet dev --clearCache`],
    ],
  }

  executeSafe = () =>
    pipe(
      S.fromEffect(this.clearCacheIfNeeded()),

      S.chain(() => core.getConfigWatch({ configPath: this.configPath })),

      S.tapSkipFirstRight(() =>
        T.log(`wesjet: change's detected, updating type definitions and data...`),
      ),

      S.tapRight((config) =>
        config.source.options.disableImportAliasWarning ? T.unit : T.fork(core.validateTsconfig),
      ),

      S.chainSwitchMapEitherRight((config) =>
        core.generateDotpkgStream({
          config,
          verbose: this.verbose,
          isDev: true,
        }),
      ),

      S.tap(E.fold((error) => T.log(errorToString(error)), core.logGenerateInfo)),

      S.runDrain,
    )
}
