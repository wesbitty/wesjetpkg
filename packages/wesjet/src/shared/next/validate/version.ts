/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 */

import { createRequire } from 'module'

const MIN_NODE_VERSION_MAJOR = 14
const MIN_NODE_VERSION_MINOR = 18

const NodeVersion = () => {
  const [nodeVersionMajor, nodeVersionMinor] = process.versions.node
    .split('.')
    .map((_) => parseInt(_, 10)) as [number, number, number]

  if (
    nodeVersionMajor < MIN_NODE_VERSION_MAJOR ||
    (nodeVersionMajor === MIN_NODE_VERSION_MAJOR && nodeVersionMinor < MIN_NODE_VERSION_MINOR)
  ) {
    throw new Error(
      `wesjet required Node.js version >= ${MIN_NODE_VERSION_MAJOR}.${MIN_NODE_VERSION_MINOR}. (current version: ${process.versions.node})`,
    )
  }
}

const WesjetPackagesVersion = () => {
  const wesjetVersion = getPackageVersion('wesjet')
  const wesjetNextVersion = getPackageVersion('wesjet')

  if (wesjetVersion !== wesjetNextVersion) {
    throw new Error(
      `
  The versions of wesjet packages need to be identical in your package.json.
  
  Latest Version 
  wesjet: "${wesjetVersion}"
  `,
    )
  }
}

const require = createRequire(import.meta.url)

const getPackageVersion = (packageName: string): string =>
  require(`${packageName}/package.json`).version

export const packageManagerVersion = () => {
  NodeVersion()
  WesjetPackagesVersion()
}
