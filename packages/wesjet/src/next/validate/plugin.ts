import '@wesjet/function.js/effect/Tracing/Enable'

import * as core from '@wesjet/core'
import { errorToString } from '@wesjet/function.js'
import { E, OT, pipe, S, T } from '@wesjet/function.js/effect'

export type NextPluginOptions = {
  configPath?: string | undefined
}

let wesjetInitialized = false

export const runWesjetDev = async ({ configPath }: NextPluginOptions) => {
  if (wesjetInitialized) return
  wesjetInitialized = true

  await pipe(
    core.getConfigWatch({ configPath }),
    S.tapSkipFirstRight(() =>
      T.log(`wesjet: change's detected, updating type definitions and data...`),
    ),
    S.tapRight((config) =>
      config.source.options.disableImportAliasWarning ? T.unit : T.fork(core.validateTsconfig),
    ),
    S.chainSwitchMapEitherRight((config) =>
      core.generateDotpkgStream({ config, verbose: false, isDev: true }),
    ),
    S.tap(E.fold((error) => T.log(errorToString(error)), core.logGenerateInfo)),
    S.runDrain,
    runMain,
  )
}

export const runWesjetBuild = async ({ configPath }: NextPluginOptions) => {
  if (wesjetInitialized) return
  wesjetInitialized = true

  await pipe(
    core.getConfig({ configPath }),
    T.chain((config) => core.generateDotpkg({ config, verbose: false })),
    T.tap(core.logGenerateInfo),
    OT.withSpan('wesjet/next:runWesjetBuild'),
    runMain,
  )
}

const runMain = core.runMain({
  tracingServiceName: 'wesjet/next',
  verbose: process.env.CL_DEBUG !== undefined,
})