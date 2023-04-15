# eslint-plugin-wesjet

Wesjet Linting and Formatting plugin

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-wesjet`:

```sh
npm install eslint-plugin-wesjet --save-dev
```

## Usage

Add `wesjet` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["wesjet"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "wesjet/rule-name": 2
  }
}
```

## Rules

<!-- begin auto-generated rules list -->

TODO: Run eslint-doc-generator to generate the rules list.

<!-- end auto-generated rules list -->
