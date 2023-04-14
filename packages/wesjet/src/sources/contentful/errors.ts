import { errorToString } from '@wesjet/function.js'
import { Tagged } from '@wesjet/function.js/effect'

export class UnknownContentfulError extends Tagged('UnknownContentfulError')<{
  readonly error: unknown
}> {
  toString = () => `UnknownContentfulError: ${errorToString(this.error)}`
}
