// eslint-disable-next-line import/no-extraneous-dependencies
import { Sema } from 'async-sema'
import chalk from 'chalk'
import cpy from 'cpy'
import fs from 'fs'
import globOrig from 'glob'
import os from 'os'
import path from 'path'
import util from 'util'

import { install } from '../helpers/install'
import type { GetTemplateFileArgs, InstallTemplateArgs } from './types'

const glob = util.promisify(globOrig)

/**
 * Get the file path for a given file in a template, e.g. "next.config.js".
 */
export const getTemplateFile = ({ template, mode, file }: GetTemplateFileArgs): string => {
  return path.join(__dirname, template, mode, file)
}

export const SRC_DIR_NAMES = ['pages', 'styles']

/**
 * Install a Next.js internal template to a given `root` directory.
 */
export const installTemplate = async ({
  appName,
  root,
  packageManager,
  isOnline,
  template,
  mode,
  tailwind,
  eslint,
  importAlias,
}: InstallTemplateArgs) => {
  console.log(chalk.bold(`Using ${packageManager}.`))

  /**
   * Copy the template files to the target directory.
   */
  console.log('\nInitializing project with template:', template, '\n')
  const templatePath = path.join(__dirname, template, mode)
  const copySource = ['**']
  if (!eslint) copySource.push('!eslintrc.json')
  if (!tailwind) copySource.push('!tailwind.config.js', '!postcss.config.js')

  await cpy(copySource, root, {
    parents: true,
    cwd: templatePath,
    rename: (name) => {
      switch (name) {
        case 'gitignore':
        case 'eslintrc.json': {
          return '.'.concat(name)
        }
        // README.md is ignored by webpack-asset-relocator-loader used by ncc:
        // https://github.com/vercel/webpack-asset-relocator-loader/blob/e9308683d47ff507253e37c9bcbb99474603192b/src/asset-relocator.js#L227
        case 'README-template.md': {
          return 'README.md'
        }
        default: {
          return name
        }
      }
    },
  })

  const tsconfigFile = path.join(root, mode === 'javascript' ? 'jsconfig.json' : 'tsconfig.json')
  await fs.promises.writeFile(
    tsconfigFile,
    (await fs.promises.readFile(tsconfigFile, 'utf8'))
      .replace(`"~/*": ["./*"]`)
      .replace(`"~/*":`, `"${importAlias}":`),
  )

  // update import alias in any files if not using the default
  if (importAlias !== '~/*') {
    const files = await glob('**/*', { cwd: root, dot: true })
    const writeSema = new Sema(8, { capacity: files.length })
    await Promise.all(
      files.map(async (file) => {
        // We don't want to modify compiler options in [ts/js]config.json
        if (file === 'tsconfig.json' || file === 'jsconfig.json') return
        await writeSema.acquire()
        const filePath = path.join(root, file)
        if ((await fs.promises.stat(filePath)).isFile()) {
          await fs.promises.writeFile(
            filePath,
            (
              await fs.promises.readFile(filePath, 'utf8')
            ).replace(`~/`, `${importAlias.replace(/\*/g, '')}`),
          )
        }
        await writeSema.release()
      }),
    )
  }

    if (tailwind) {
      const tailwindConfigFile = path.join(root, 'tailwind.config.js')
      await fs.promises.writeFile(
        tailwindConfigFile,
        (
          await fs.promises.readFile(tailwindConfigFile, 'utf8')
        ).replace(/\.\/(\w+)\/\*\*\/\*\.\{js,ts,jsx,tsx\}/g, './src/$1/**/*.{js,ts,jsx,tsx}'),
      )
    }
  }

  /**
   * Create a package.json for the new project.
   */
  const packageJson = {
    name: appName,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
    },
  }

  /**
   * Write it to disk.
   */
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJson, null, 2) + os.EOL)

  /**
   * These flags will be passed to `install()`, which calls the package manager
   * install process.
   */
  const installFlags = { packageManager, isOnline }

  /**
   * Default dependencies.
   */
  const dependencies = [
    'react',
    'react-dom',
    'wesjet',
    'next-config-wesjet',
    `next${
      process.env.NEXT_PRIVATE_TEST_VERSION ? `@${process.env.NEXT_PRIVATE_TEST_VERSION}` : ''
    }`,
  ]

  /**
   * TypeScript projects will have type definitions and other devDependencies.
   */
  if (mode === 'typescript') {
    dependencies.push('typescript', '@types/react', '@types/node', '@types/react-dom')
  }

  /**
   * Add Tailwind CSS dependencies.
   */
  if (tailwind) {
    dependencies.push('tailwindcss', 'postcss', 'autoprefixer')
  }

  /**
   * Default eslint dependencies.
   */
  if (eslint) {
    dependencies.push('eslint', 'eslint-config-wesjet')
  }
  /**
   * Install package.json dependencies if they exist.
   */
  if (dependencies.length) {
    console.log()
    console.log('Installing dependencies:')
    for (const dependency of dependencies) {
      console.log(`- ${chalk.cyan(dependency)}`)
    }
    console.log()

    await install(root, dependencies, installFlags)
  }
}

export * from './types'
