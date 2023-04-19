/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Builtins, Cli } from 'clipanion'

import { DefaultCommand } from './DefaultCommand.js'

export const run = async () => {
  const [node, app, ...args] = process.argv

  const cli = new Cli({
    binaryLabel: `My Application`,
    binaryName: `${node} ${app}`,
    binaryVersion: `0.0.22`,
  })

  cli.register(DefaultCommand)
  cli.register(Builtins.HelpCommand)
  cli.register(Builtins.VersionCommand)

  await cli.runExit(args, Cli.defaultContext)
}
