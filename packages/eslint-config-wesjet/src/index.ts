import allRules from './rules'

const presetConfig = require('./configs/preset')
const nextConfig = require('./configs/next')
const reactConfig = require('./configs/react')

// for legacy config system
const plugins = ['wesjet']

module.exports = {
  deprecatedRules: presetConfig.plugins.wesjet.deprecatedRules,
  rules: allRules,
  configs: {
    preset: Object.assign({}, presetConfig, {
      parserOptions: presetConfig.languageOptions.parserOptions,
      plugins,
    }),
    next: Object.assign({}, nextConfig, {
      parserOptions: nextConfig.languageOptions.parserOptions,
      plugins,
    }),
    react: Object.assign({}, reactConfig, {
      parserOptions: reactConfig.languageOptions.parserOptions,
      plugins,
    }),
  },
}
