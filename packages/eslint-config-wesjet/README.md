# eslint-config-wesjet

[Wesjet] specific linting rules for `eslint`

## Installation

```sh
npm install eslint eslint-config-wesjet --save-dev
```

It is also possible to install ESLint globally rather than locally (using `npm install -g eslint`). However, this is not recommended, and any plugins or shareable configs that you use must be installed locally in either case.

## Usage (legacy: `.eslintrc*`)

Use [our preset](#preset) to get reasonable defaults:

```json
  "extends": [
    "eslint:recommended",
    "plugin:wesjet/preset"
  ]
```

- Next.js Usage
  [Wesjet] configuration preset in [Next.js](https://nextjs.org) application.

```json
  "extends": [
    "eslint:recommended",
    "plugin:wesjet/next"
  ]
```

## License

`eslint-plugin-wesjet` is licensed under the [MIT License](https://opensource.org/licenses/mit-license.php).
