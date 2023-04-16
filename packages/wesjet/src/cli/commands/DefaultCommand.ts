/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @dimejiSR
 */

import { OT, pipe, T } from '@wesjet/function.js/effect'
import { Command } from 'clipanion'

import { BaseCommand } from './_BaseCommand.js'

export class DefaultCommand extends BaseCommand {
  static paths = [Command.Default]

  executeSafe = () =>
    pipe(
      T.succeedWith(() => console.log(this.cli.usage())),
      OT.withSpan('wesjet/cli/commands/DefaultCommand:executeSafe', {
        attributes: { cwd: process.cwd() },
      }),
    )
}
