/**
 * @fileoverview wesjet/no-html-link-for-pages
 * @author DimejiSR
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-html-link-for-pages'),
  RuleTester = require('eslint').RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester()
ruleTester.run('no-html-link-for-pages', rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: '^_',
      errors: [{ message: 'Fill me in.', type: 'Me too' }],
    },
  ],
})
