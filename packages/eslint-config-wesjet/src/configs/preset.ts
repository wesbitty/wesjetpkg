import fromEntries from 'object.fromentries'
import entries from 'object.entries'
import allRules from '../rules'

function filterRules(rules, predicate) {
  return fromEntries(entries(rules).filter((entry) => predicate(entry[1])))
}

function configureAsError(rules) {
  return fromEntries(Object.keys(rules).map((key) => [`wesjet/${key}`, 2]))
}

const activeRules = filterRules(allRules, (rule) => !rule.meta.deprecated)
const activeRulesConfig = configureAsError(activeRules)

const deprecatedRules = filterRules(allRules, (rule) => rule.meta.deprecated)

module.exports = {
  plugins: {
    wesjet: {
      deprecatedRules,
      rules: allRules,
    },
  },
  rules: activeRulesConfig,
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
}

// this is so the `languageOptions` property won't be warned in the new config system
Object.defineProperty(module.exports, 'languageOptions', { enumerable: false })
