/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 */

import type { MDXComponents } from 'mdx/types'
import * as React from 'react'
import ReactDOM from 'react-dom'

import { _jsx_runtime } from './ReactJSX.cjs'

type MDXContentProps = {
  [props: string]: unknown
  components?: MDXComponents
}

const getMDXComponent = (
  code: string,
  globals: Record<string, unknown> = {},
): React.ComponentType<MDXContentProps> => {
  const scope = { React, ReactDOM, _jsx_runtime, ...globals }
  const fn = new Function(...Object.keys(scope), code)
  return fn(...Object.values(scope)).default
}

export const MakeMdx = (code: string, globals: Record<string, unknown> = {}) => {
  return React.useMemo(() => getMDXComponent(code, globals), [code, globals])
}
