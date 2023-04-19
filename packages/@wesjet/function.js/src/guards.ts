/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

export const isNotUndefined = <T>(_: T | undefined): _ is T => _ !== undefined
export const isUndefined = <T>(_: T | undefined): _ is undefined => _ === undefined
