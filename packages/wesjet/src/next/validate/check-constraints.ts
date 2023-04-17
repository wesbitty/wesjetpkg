/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 *
 */

import { createRequire } from 'module'

export const checkConstraints = () => {
  checkNodeVersion()
  checkWesjetVersionsMatch()
}

export const MIN_NODE_VERSION_MAJOR = 14
export const MIN_NODE_VERSION_MINOR = 18

const checkNodeVersion = () => {
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

const checkWesjetVersionsMatch = () => {
  const wesjetVersion = getPackageVersion('wesjet')
  const wesjetEslintVersion = getPackageVersion('eslint-plugin-wesjet')

  if (wesjetVersion !== wesjetEslintVersion) {
    throw new Error(
      `\
The versions of "wesjet" and "eslint-plugin-wesjet" need to be identical in your "package.json".
currently used versions: wesjet: "${wesjetVersion}", eslint-plugin-wesjet: "${wesjetEslintVersion}"`,
    )
  }
}

const require = createRequire(import.meta.url)

const getPackageVersion = (packageName: string): string =>
  require(`${packageName}/package.json`).version
