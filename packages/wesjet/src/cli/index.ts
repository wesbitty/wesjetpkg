/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import '@wesjet/function.js/effect/Tracing/Enable'

import process from 'process'

import { provideDummyTracing } from '@wesjet/function.js'
import { pipe, T } from '@wesjet/function.js/effect'
import { getWesjetVersion } from '@wesjet/function.js/node'
import { Builtins, Cli } from 'clipanion'

import { WesjetBuild } from './commands/WesjetBuild.js'
import { WesjetDefaultCmd } from './commands/WesjetDefaultCmd.js'
import { WesjetDev } from './commands/WesjetDev.js'
import { WesjetInstallNative } from './commands/WesjetInstallNative.js'

export const run = async () => {
  const [node, app, ...args] = process.argv

  const wesjetVersion = await pipe(getWesjetVersion(), provideDummyTracing, T.runPromise)

  const cli = new Cli({
    binaryLabel: `Wesjet CLI`,
    binaryName: process.env['WESJET_PROCESS_ENV'] ? `${node} ${app}` : 'wesjet',
    binaryVersion: wesjetVersion,
  })

  cli.register(WesjetDefaultCmd)
  cli.register(WesjetDev)
  cli.register(WesjetBuild)
  cli.register(WesjetInstallNative)
  cli.register(Builtins.HelpCommand)
  cli.register(Builtins.VersionCommand)

  // Run the CLI
  await cli.runExit(args, Cli.defaultContext)
}
