import linkElementRule from './link-element'
import imageElementRule from './image-element'
import moduleVariableRule from './module-variable'
// @ts-ignore
import banTypesRule from './ban-types'

export default {
  'link-element': linkElementRule,
  'image-element': imageElementRule,
  'module-variable': moduleVariableRule,
  'ts-ban-types': banTypesRule,
}
