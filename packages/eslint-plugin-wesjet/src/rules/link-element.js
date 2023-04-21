'use strict'
var createRule_1 = require('../shared/createRule')
var path = require('path')
var fs = require('fs')
var fetchRootDir_1 = require('../shared/fetchRootDir')
var url_1 = require('../shared/url')
var pagesDirWarning = (0, url_1.execOnce)(function (pagesDirs) {
  console.warn(
    'Pages directory cannot be found at '.concat(pagesDirs.join(' or '), '. ') +
      'If using a custom path, please configure with the `no-html-link-for-pages` rule in your eslint config file.',
  )
})
// Cache for fs.existsSync lookup.
// Prevent multiple blocking IO requests that have already been calculated.
var fsExistsSyncCache = {}
var url = 'https://nextjs.org/docs/messages/no-html-link-for-pages'
module.exports = (0, createRule_1.createRule)({
  meta: {
    docs: {
      description: 'Prevent usage of `<a>` elements to navigate to internal Next.js pages.',
      category: 'HTML',
      recommended: true,
      url: url,
    },
    type: 'problem',
    schema: [
      {
        oneOf: [
          {
            type: 'string',
          },
          {
            type: 'array',
            uniqueItems: true,
            items: {
              type: 'string',
            },
          },
        ],
      },
    ],
  },
  /**
   * Creates an ESLint rule listener.
   */
  create: function (context) {
    var ruleOptions = context.options
    var customPagesDirectory = ruleOptions[0]
    var rootDirs = (0, fetchRootDir_1.fetchRootDirs)(context)
    var pagesDirs = (
      customPagesDirectory
        ? [customPagesDirectory]
        : rootDirs.map(function (dir) {
            return [path.join(dir, 'pages'), path.join(dir, 'src', 'pages')]
          })
    ).flat()
    var foundPagesDirs = pagesDirs.filter(function (dir) {
      if (fsExistsSyncCache[dir] === undefined) {
        fsExistsSyncCache[dir] = fs.existsSync(dir)
      }
      return fsExistsSyncCache[dir]
    })
    var appDirs = rootDirs
      .map(function (dir) {
        return [path.join(dir, 'app'), path.join(dir, 'src', 'app')]
      })
      .flat()
    var foundAppDirs = appDirs.filter(function (dir) {
      if (fsExistsSyncCache[dir] === undefined) {
        fsExistsSyncCache[dir] = fs.existsSync(dir)
      }
      return fsExistsSyncCache[dir]
    })
    // warn if there are no pages and app directories
    if (foundPagesDirs.length === 0 && foundAppDirs.length === 0) {
      pagesDirWarning(pagesDirs)
      return {}
    }
    var pageUrls = (0, url_1.getUrlFromPagesDirectories)('/', foundPagesDirs)
    return {
      JSXOpeningElement: function (node) {
        if (node.name.name !== 'a') {
          return
        }
        if (node.attributes.length === 0) {
          return
        }
        var target = node.attributes.find(function (attr) {
          return attr.type === 'JSXAttribute' && attr.name.name === 'target'
        })
        if (target && target.value.value === '_blank') {
          return
        }
        var href = node.attributes.find(function (attr) {
          return attr.type === 'JSXAttribute' && attr.name.name === 'href'
        })
        if (!href || (href.value && href.value.type !== 'Literal')) {
          return
        }
        var hasDownloadAttr = node.attributes.find(function (attr) {
          return attr.type === 'JSXAttribute' && attr.name.name === 'download'
        })
        if (hasDownloadAttr) {
          return
        }
        var hrefPath = (0, url_1.normalizeURL)(href.value.value)
        // Outgoing links are ignored
        if (/^(https?:\/\/|\/\/)/.test(hrefPath)) {
          return
        }
        pageUrls.forEach(function (pageUrl) {
          if (pageUrl.test((0, url_1.normalizeURL)(hrefPath))) {
            context.report({
              node: node,
              message: 'Do not use an `<a>` element to navigate to `'
                .concat(hrefPath, '`. Use `<Link />` from `next/link` instead. See: ')
                .concat(url),
            })
          }
        })
      },
    }
  },
})
