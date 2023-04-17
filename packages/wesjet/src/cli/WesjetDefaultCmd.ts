#!/usr/bin/env node

/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { OT, pipe, T } from '@wesjet/function.js/effect'
import { Command } from 'clipanion'

import { BaseCommand } from './WesjetBaseCmd.js'

export class WesjetDefaultCmd extends BaseCommand {
  static paths = [Command.Default]

  executeSafe = () =>
    pipe(
      T.succeedWith(() => console.log(this.cli.usage())),
      OT.withSpan('wesjet/cli/WesjetDefaultCmd:executeSafe', {
        attributes: { cwd: process.cwd() },
      }),
    )
}
