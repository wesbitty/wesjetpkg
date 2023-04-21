import base from './configs/base'
import eslintRecommended from './configs/eslint'
import recommended from './configs/recommended'
import rules from './rules'

export = {
  rules,
  configs: {
    base,
    'eslint-recommended': eslintRecommended,
    recommended,
  },
}
