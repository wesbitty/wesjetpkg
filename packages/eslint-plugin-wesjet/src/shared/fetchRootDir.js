'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.fetchRootDirs = void 0
var glob = require('glob')
/**
 * Process a Next.js root directory glob.
 */
var processRootDir = function (rootDir) {
  // Ensures we only match folders.
  if (!rootDir.endsWith('/')) rootDir += '/'
  return glob.sync(rootDir)
}
/**
 * Gets one or more Root, returns an array of root directories.
 */
var fetchRootDirs = function (context) {
  var rootDirs = [context.getCwd()]
  var nextSettings = context.settings.next || {}
  var rootDir = nextSettings.rootDir
  if (typeof rootDir === 'string') {
    rootDirs = processRootDir(rootDir)
  } else if (Array.isArray(rootDir)) {
    rootDirs = rootDir
      .map(function (dir) {
        return typeof dir === 'string' ? processRootDir(dir) : []
      })
      .flat()
  }
  return rootDirs
}
exports.fetchRootDirs = fetchRootDirs
