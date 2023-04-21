'use strict'
var createRule_1 = require('../shared/createRule')
var url = 'https://nextjs.org/docs/messages/no-img-element'
module.exports = (0, createRule_1.createRule)({
  meta: {
    docs: {
      description: 'Prevent usage of `<img>` element due to slower LCP and higher bandwidth.',
      category: 'HTML',
      recommended: true,
      url: url,
    },
    type: 'problem',
    schema: [],
  },
  create: function (context) {
    return {
      JSXOpeningElement: function (node) {
        var _a, _b, _c, _d
        if (node.name.name !== 'img') {
          return
        }
        if (node.attributes.length === 0) {
          return
        }
        if (
          ((_d =
            (_c =
              (_b = (_a = node.parent) === null || _a === void 0 ? void 0 : _a.parent) === null ||
              _b === void 0
                ? void 0
                : _b.openingElement) === null || _c === void 0
              ? void 0
              : _c.name) === null || _d === void 0
            ? void 0
            : _d.name) === 'picture'
        ) {
          return
        }
        context.report({
          node: node,
          message:
            'Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` to automatically optimize images. This may incur additional usage or cost from your provider. See: '.concat(
              url,
            ),
        })
      },
    }
  },
})
