/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @dimejiSR
 */
import { type Temporal, toTemporalInstant } from '@js-temporal/polyfill'
export * as base64 from './base64'
export * from './file-paths'
export * from './guards'
export * from './hash'
export * from './object'
export * from './promise'
export * from './single-item'
export * from './string'
export * from './tracing'
export * from './tracing-effect'
export { Temporal } from '@js-temporal/polyfill'
export { AsciiTree } from 'oo-ascii-tree'
export * as pattern from 'ts-pattern'
import { Tagged } from '@effect-ts/core/Case'
// inflection is a CJS module, so we need to import it as default export
import inflection from 'inflection'

export { inflection }

Date.prototype.toTemporalInstant = toTemporalInstant

declare global {
  interface Date {
    toTemporalInstant(): Temporal.Instant
  }
}

export const recRemoveUndefinedValues = (val: any): void => {
  if (Array.isArray(val)) {
    val.forEach(recRemoveUndefinedValues)
  } else if (typeof val === 'object') {
    Object.keys(val).forEach((key) => {
      if (val[key] === undefined) {
        delete val[key]
      } else {
        recRemoveUndefinedValues(val[key])
      }
    })
  }
}

export const partition = <T, TLeft extends T>(
  arr: T[],
  isLeft: (_: T) => _ is TLeft,
): [TLeft[], Exclude<T, TLeft>[]] => {
  return arr.reduce(
    (acc, el) => {
      if (isLeft(el)) {
        acc[0]!.push(el)
      } else {
        acc[1]!.push(el as Exclude<T, TLeft>)
      }
      return acc
    },
    [[], []] as [TLeft[], Exclude<T, TLeft>[]],
  )
}

export const not =
  <T, TGuarded extends T>(guard: (_: T) => _ is TGuarded) =>
  (el: T): el is Exclude<T, TGuarded> =>
    !guard(el)

export const errorToString = (error: any) => {
  const stack = process.env.CL_DEBUG ? error.stack : undefined
  const str = error.toString()
  const stackStr = stack ? `\n${stack}` : ''
  if (str !== '[object Object]') return str + stackStr

  return JSON.stringify({ ...error, stack }, null, 2)
}

export const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1)

/**
 * Use this to make assertion at end of if-else chain that all members of a
 * union have been accounted for.
 */
export function casesHandled(x: never): never {
  throw new Error(`A case was not handled for value: ${JSON.stringify(x)}`)
}

export function notImplemented(msg?: string): never {
  throw new Error(`Not yet implemented ${msg}`)
}

export type Thunk<T> = () => T

export const unwrapThunk = <T>(_: T | (() => T)): T => {
  if (typeof _ === 'function') {
    return (_ as any)()
  } else {
    return _
  }
}

export class RawError extends Tagged('RawError')<{ readonly error: unknown }> {}

export const isReadonlyArray = <T>(_: any): _ is ReadonlyArray<T> => Array.isArray(_)

export function assertNever(_: any): never {
  throw new Error(`assertNever: This should never happen ${JSON.stringify(_)}`)
}

export const asMutableArray = <T>(arr: ReadonlyArray<T>): T[] => arr.slice()
