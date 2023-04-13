/**
 * @fileoverview wesjet/no-html-link-for-pages
 * @author DimejiSR
 */
'use strict'

import { defineRule } from '../processors/rule'
import * as path from 'path'
import * as fs from 'fs'
import { getRootDirs } from '../processors/rootDir'

import { getUrlFromPagesDirectories, normalizeURL, execOnce } from '../processors/url'

const pagesDirWarning = execOnce((pagesDirs) => {
  console.warn(
    `Pages directory cannot be found at ${pagesDirs.join(' or ')}. ` +
      'If using a custom path, please configure with the `no-html-link-for-pages` rule in your eslint config file.',
  )
})

// Cache for fs.existsSync lookup.
// Prevent multiple blocking IO requests that have already been calculated.
const fsExistsSyncCache = {}

// Rule definition
export = defineRule({
  meta: {
    docs: {
      description: 'Prevent usage of `<a>` elements to navigate to internal pages.',
      category: 'HTML',
      recommended: true,
      url: 'https://wesbitty.org/product/wesjet/messages', // URL to the documentation page for this rule
    },
    type: 'problem', // 'problem', 'suggestion' or 'layout'
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
  create(context) {
    const ruleOptions: (string | string[])[] = context.options
    const [customPagesDirectory] = ruleOptions

    const rootDirs = getRootDirs(context)

    const pagesDirs = (
      customPagesDirectory
        ? [customPagesDirectory]
        : rootDirs.map((dir) => [path.join(dir, 'pages'), path.join(dir, 'src', 'pages')])
    ).flat()

    const foundPagesDirs = pagesDirs.filter((dir) => {
      if (fsExistsSyncCache[dir] === undefined) {
        fsExistsSyncCache[dir] = fs.existsSync(dir)
      }
      return fsExistsSyncCache[dir]
    })

    const appDirs = rootDirs
      .map((dir) => [path.join(dir, 'app'), path.join(dir, 'src', 'app')])
      .flat()

    const foundAppDirs = appDirs.filter((dir) => {
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

    const pageUrls = getUrlFromPagesDirectories('/', foundPagesDirs)
    return {
      JSXOpeningElement(node) {
        if (node.name.name !== 'a') {
          return
        }

        if (node.attributes.length === 0) {
          return
        }

        const target = node.attributes.find(
          (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'target',
        )

        if (target && target.value.value === '_blank') {
          return
        }

        const href = node.attributes.find(
          (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'href',
        )

        if (!href || (href.value && href.value.type !== 'Literal')) {
          return
        }

        const hasDownloadAttr = node.attributes.find(
          (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'download',
        )

        if (hasDownloadAttr) {
          return
        }

        const hrefPath = normalizeURL(href.value.value)
        // Outgoing links are ignored
        if (/^(https?:\/\/|\/\/)/.test(hrefPath)) {
          return
        }

        pageUrls.forEach((pageUrl) => {
          if (pageUrl.test(normalizeURL(hrefPath))) {
            context.report({
              node,
              message: `Do not use an \`<a>\` element to navigate to \`${hrefPath}\`. Use \`<Link />\` from \`next/link\` instead. See: https://wesbitty.org/product/wesjet`,
            })
          }
        })
      },
    }
  },
})
