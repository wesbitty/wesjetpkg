# Contributing to Wesjet

Wesjet is developed as a mono-repo using Npm.

- The development branch is `origin/changelog`.
- All pull requests should be opened against `origin/changelog`.
- The changes on the `origin/changelog` branch are published to the `@rc` tag on npm regularly.

To develop locally:

1. Install the [GitHub CLI](https://github.com/cli/cli#installation).
1. Clone the Next.js repository (download only recent commits for faster clone):

```sh
gh repo clone wesbitty/wesjet -- --depth=3000 --branch origin/changelog --single-branch
```

1. Create a new branch:

```sh
git checkout -b MY_BRANCH_NAME origin/changelog
```

1. Installing Dependencies

```sh
npm install
```

1. Building

You can build Wesjet, including all type definitions and packages, with:

```sh
npm run build
```

1. Start developing and watch for code changes:

```sh
npm run dev
```

1. Testing Codes

Start testing code using npm run test which will run test on all packages.

```sh
npm run test
```

1. When your changes are finished, commit them to the branch:
   ```
   git add .
   git commit -m "DESCRIBE_YOUR_CHANGES_HERE"
   ```
1. To open a pull request you can use the GitHub CLI which automatically forks and sets up a remote branch. Follow the prompts when running:
   ```
   gh pr create
   ```

For instructions on how to build a project with your local version of the CLI,
see **[Developing Using Your Local Version of Wesjet](./developing-using-local-app.md)** as linking the package is not sufficient to develop locally.
Give feedback


# Adding a new feature

Anyone can propose a change to Next.js. However, adding new features often requires community discussions before proceeding with the implementation.

Therefore, before opening a PR, you should use the [Feature Request discussion template](https://github.com/vercel/next.js/discussions/new?category=ideas) and collect feedback.

## Why use a discussion?

The discussion's goal is to achieve the following:

1. **Verify the validity of the feature request**: The community can upvote discussions. Highly upvoted feature requests are more likely to be considered.
2. **Understanding the consequences**: Any feature added to Next.js is likely to be around for a while and _has to be maintained_. This means that a new feature has to cover many use cases, needs to consider how it affects the ecosystem, and so on.
3. **Looking at and understanding historical reasons for the current behavior or lack of the feature**: There might be a reason why a feature does not exist, or why the current implementation is in a certain way. There must be solid reasoning to change this, as the feature needs to be maintained even after it is added. (See 2.). Next.js has a strong policy on not breaking features, so any new feature has to be added in a way that makes it possible to incrementally adopt it.

## Examples

The Next.js team uses RFCs (Request For Comment), which you can find in [this discussion category](https://github.com/vercel/next.js/discussions/categories/rfc). Reading through these, you can get a better understanding of what is expected to be included in a good feature request.
