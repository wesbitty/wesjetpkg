# Contributing

When contributing [Wesjet](https://github.com/wesbitty/wesjet), please first discuss the change you wish to make via [GitHub Discussions](https://github.com/wesbitty/wesbitty/discussions/new) with the owners of this repository before submitting a Pull Request.

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) and follow it in all your interactions with the project.

# Developing [Wesjet](https://github.com/wesbitty/wesjet).

1. [Getting started](#getting-started)
   - [Install dependencies](#install-dependencies)
2. [Local development](#local-development)
   - [Fork the repository](#fork-the-repository)
   - [Clone the repo](#clone-the-repo)
   - [Developing](#developing)
3. [Adding a new feature](#adding-a-new-feature)
   - [Why use a discussion?](#Why-use-a-discussion?)
   - [Examples](#examples)

- The development branch is `origin/changelog`.
- All pull requests should be opened against `origin/changelog`.
- The changes on the `origin/changelog` branch are published to the `@rc` tag on npm regularly.

## Getting started

Thanks for your interest in [Wesjet](https://github.com/wesbitty/wesjet) and for wanting to contribute! Before you begin, read the
[code of conduct](./CODE_OF_CONDUCT.md) and check out the
[existing issues](https://github.com/wesbitty/wesjet/issues).
This document describes how to set up your development environment to build and test [Wesjet](https://github.com/wesbitty/wesjet).

### Install dependencies

You need to install and configure the following dependencies on your machine to build [Wesbitty](https://wesbitty.org):

- [Git](http://git-scm.com/)
- [GitHub CLI](https://github.com/cli/cli#installation).
- [Node.js v18.x (LTS)](http://nodejs.org)
- [Npm](https://www.npmjs.com/) version 7+ or [Npm](https://npmjs.org/)

## Local development

This project is configured in a lerna monorepo, where one repository contains multiple npm packages. Dependencies are installed and managed with `npm` CLI.

Make sure all the tests pass before making changes.

### Fork the repository

To contribute code to [Wesjet](https://github.com/wesbitty/wesjet), you must fork the [Wesjet Repository](https://github.com/wesbitty/wesjet).

### Clone the repo

To get started, execute the following:

1. Clone the Wesjet repository (download only recent commits for faster clone):
   ```
   gh repo clone wesbitty/wesjet -- --depth=3000 --branch origin/changelog --single-branch
   ```
1. Create a new branch:
   ```
   git checkout -b MY_BRANCH_NAME origin/changelog
   ```

### Developing

1. Install the dependences in the root of the repo.
   ```
   npm install
   ```

1. You can build [Wesjet](https://github.com/wesbitty/wesjet), including all type definitions and packages, with:
   ```
   npm run build
   ```

1. Start developing and watch for code changes:
   ```
   npm run dev
   ```

1. Start testing code using npm run test which will run test on all packages:
   ```
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

## Adding a new feature

Anyone can propose a change to Wesjet. However, adding new features often requires community discussions before proceeding with the implementation.

Therefore, before opening a PR, you should use the [Feature Request discussion template](https://github.com/wesbitty/wesjet/discussions/new?category=ideas) and collect feedback.

### Why use a discussion?

The discussion's goal is to achieve the following:

1. **Verify the validity of the feature request**: The community can upvote discussions. Highly upvoted feature requests are more likely to be considered.
2. **Understanding the consequences**: Any feature added to [Wesjet](https://github.com/wesbitty/wesjet) is likely to be around for a while and _has to be maintained_. This means that a new feature has to cover many use cases, needs to consider how it affects the ecosystem, and so on.
3. **Looking at and understanding historical reasons for the current behavior or lack of the feature**: There might be a reason why a feature does not exist, or why the current implementation is in a certain way. There must be solid reasoning to change this, as the feature needs to be maintained even after it is added. (See 2.). [Wesjet](https://github.com/wesbitty/wesjet) has a strong policy on not breaking features, so any new feature has to be added in a way that makes it possible to incrementally adopt it.

### Examples

The [Wesjet](https://github.com/wesbitty/wesjet) team uses RFCs (Request For Comment), which you can find in [this discussion category](https://github.com/wesbitty/wesjet/discussions/categories/rfc). Reading through these, you can get a better understanding of what is expected to be included in a good feature request.
