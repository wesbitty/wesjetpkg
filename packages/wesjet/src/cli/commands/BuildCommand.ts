/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @dimejiSR
 */

import * as core from '@wesjet/core'
import { OT, pipe, T } from '@wesjet/function.js/effect'
import type { Usage } from 'clipanion'

import { BaseCommand } from './_BaseCommand.js'

export class BuildCommand extends BaseCommand {
  static paths = [['build']]

  static usage: Usage = {
    description: `Transforms your content into static data`,
    details: `
      TODO: Longer description 
    `,
    examples: [
      [`Simple run`, `$0 build`],
      [`Clear cache before run`, `$0 build --clearCache`],
    ],
  }

  executeSafe = () =>
    pipe(
      this.clearCacheIfNeeded(),
      T.chain(() => core.getConfig({ configPath: this.configPath })),
      T.tap((config) =>
        config.source.options.disableImportAliasWarning ? T.unit : T.fork(core.validateTsconfig),
      ),
      T.chain((config) => core.generateDotpkg({ config, verbose: this.verbose })),
      T.tap(core.logGenerateInfo),
      OT.withSpan('wesjet/cli/commands/BuildCommand:executeSafe'),
    )
}
