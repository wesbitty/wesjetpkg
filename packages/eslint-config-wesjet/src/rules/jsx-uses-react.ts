import pragmaUtil from '../utils/pragma'
import { url } from '../utils/url'

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  // eslint-disable-next-line eslint-plugin/prefer-message-ids -- https://github.com/not-an-aardvark/eslint-plugin-eslint-plugin/issues/292
  meta: {
    docs: {
      description: 'Disallow React to be incorrectly marked as unused',
      category: 'Best Practices',
      recommended: true,
      url: url('jsx-uses-react'),
    },
    schema: [],
  },

  create(context) {
    const pragma = pragmaUtil.getFromContext(context)
    const fragment = pragmaUtil.getFragmentFromContext(context)

    function handleOpeningElement() {
      context.markVariableAsUsed(pragma)
    }
    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      JSXOpeningElement: handleOpeningElement,
      JSXOpeningFragment: handleOpeningElement,
      JSXFragment() {
        context.markVariableAsUsed(fragment)
      },
    }
  },
}
