'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.execOnce = exports.getUrlFromPagesDirectories = exports.normalizeURL = void 0
var path = require('path')
var fs = require('fs')
// Cache for fs.lstatSync lookup.
// Prevent multiple blocking IO requests that have already been calculated.
var fsLstatSyncCache = {}
var fsLstatSync = function (source) {
  fsLstatSyncCache[source] = fsLstatSyncCache[source] || fs.lstatSync(source)
  return fsLstatSyncCache[source]
}
/**
 * Checks if the source is a directory.
 */
function isDirectory(source) {
  return fsLstatSync(source).isDirectory()
}
/**
 * Checks if the source is a directory.
 */
function isSymlink(source) {
  return fsLstatSync(source).isSymbolicLink()
}
// Cache for fs.readdirSync lookup.
// Prevent multiple blocking IO requests that have already been calculated.
var fsReadDirSyncCache = {}
/**
 * Recursively parse directory for page URLs.
 */
function parseUrlForPages(urlprefix, directory) {
  fsReadDirSyncCache[directory] = fsReadDirSyncCache[directory] || fs.readdirSync(directory)
  var res = []
  fsReadDirSyncCache[directory].forEach(function (fname) {
    // TODO: this should account for all page extensions
    // not just js(x) and ts(x)
    if (/(\.(j|t)sx?)$/.test(fname)) {
      if (/^index(\.(j|t)sx?)$/.test(fname)) {
        res.push(''.concat(urlprefix).concat(fname.replace(/^index(\.(j|t)sx?)$/, '')))
      }
      res.push(''.concat(urlprefix).concat(fname.replace(/(\.(j|t)sx?)$/, '')))
    } else {
      var dirPath = path.join(directory, fname)
      if (isDirectory(dirPath) && !isSymlink(dirPath)) {
        res.push.apply(res, parseUrlForPages(urlprefix + fname + '/', dirPath))
      }
    }
  })
  return res
}
/**
 * Takes a URL and does the following things.
 *  - Replaces `index.html` with `/`
 *  - Makes sure all URLs are have a trailing `/`
 *  - Removes query string
 */
function normalizeURL(url) {
  if (!url) {
    return
  }
  url = url.split('?')[0]
  url = url.split('#')[0]
  url = url = url.replace(/(\/index\.html)$/, '/')
  // Empty URLs should not be trailed with `/`, e.g. `#heading`
  if (url === '') {
    return url
  }
  url = url.endsWith('/') ? url : url + '/'
  return url
}
exports.normalizeURL = normalizeURL
/**
 * Gets the possible URLs from a directory.
 */
function getUrlFromPagesDirectories(urlPrefix, directories) {
  return Array.from(
    // De-duplicate similar pages across multiple directories.
    new Set(
      directories
        .map(function (directory) {
          return parseUrlForPages(urlPrefix, directory)
        })
        .flat()
        .map(
          // Since the URLs are normalized we add `^` and `$` to the RegExp to make sure they match exactly.
          function (url) {
            return '^'.concat(normalizeURL(url), '$')
          },
        ),
    ),
  ).map(function (urlReg) {
    urlReg = urlReg.replace(/\[.*\]/g, '((?!.+?\\..+?).*?)')
    return new RegExp(urlReg)
  })
}
exports.getUrlFromPagesDirectories = getUrlFromPagesDirectories
function execOnce(fn) {
  var used = false
  var result
  return function () {
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    if (!used) {
      used = true
      result = fn.apply(void 0, args)
    }
    return result
  }
}
exports.execOnce = execOnce
