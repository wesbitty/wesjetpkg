import * as path from "node:path";

import * as core from "@wesjet/core";
import { OT, pipe, T } from "@wesjet/utils/effect";
import { fs } from "@wesjet/utils/node";

import { BaseCommand } from "./_BaseCommand.js";

export class PostInstallCommand extends BaseCommand {
  static paths = [["postinstall"]];

  executeSafe = () => {
    const { configPath } = this;
    return pipe(
      T.gen(function* ($) {
        const artifactsDirPath = yield* $(core.ArtifactsDir.mkdir);

        yield* $(
          generateTypes({ artifactsDirPath, moduleName: "jetpack", configPath })
        );

        yield* $(addToplevelDotpkgToGitignore());
      }),
      OT.withSpan("@wesjet/cli/commands/PostInstallCommand:executeSafe", {
        attributes: { cwd: process.cwd() },
      })
    );
  };
}

// TODO unify this implementation with `generateDotpkg`
const generateTypes = ({
  artifactsDirPath,
  moduleName,
  configPath,
}: {
  artifactsDirPath: string;
  moduleName: string;
  configPath?: string;
}) =>
  T.gen(function* ($) {
    const dirPath = path.join(artifactsDirPath, moduleName);
    const dirExists = yield* $(fs.fileOrDirExists(dirPath));
    if (!dirExists) {
      yield* $(fs.mkdirp(dirPath));
    }

    const indexDtsFilePath = path.join(dirPath, "index.d.ts");
    const indexDtsFileExists = yield* $(fs.fileOrDirExists(indexDtsFilePath));

    const typesDtsFilePath = path.join(dirPath, "types.d.ts");
    const typesDtsFileExists = yield* $(fs.fileOrDirExists(typesDtsFilePath));

    if (indexDtsFileExists && typesDtsFileExists) return;

    const sourceEither = yield* $(
      pipe(core.getConfig({ configPath }), T.either)
    );
    if (sourceEither._tag === "Left") {
      if (sourceEither.left._tag === "NoConfigFoundError") {
        yield* $(fs.writeFile(indexDtsFilePath, moduleStubFileIndexDts));
        return;
      } else {
        return yield* $(T.fail(sourceEither.left));
      }
    }

    const { source, esbuildHash } = sourceEither.right;
    const schemaDef = yield* $(source.provideSchema(esbuildHash));

    if (!indexDtsFileExists) {
      yield* $(
        fs.writeFile(indexDtsFilePath, core.makeDataTypes({ schemaDef }))
      );
    }

    if (!typesDtsFileExists) {
      const generationOptions = {
        sourcePluginType: source.type,
        options: source.options,
      };
      yield* $(
        fs.writeFile(
          typesDtsFilePath,
          core.renderTypes({ schemaDef, generationOptions })
        )
      );
    }
  });

const moduleStubFileIndexDts = `\
// THIS FILE IS COMPILED BY WESJET AUTOMATICALLY | DO NOT EDIT.
// THIS IS A PLACEHOLDER UNTIL \`wesjet build\` HAS BEEN RUN.

export {}
`;

const addToplevelDotpkgToGitignore = () =>
  T.gen(function* ($) {
    const cwd = yield* $(core.getCwd);
    const gitignoreFilePath = path.join(cwd, ".gitignore");
    const gitignoreExists = yield* $(fs.fileOrDirExists(gitignoreFilePath));
    if (gitignoreExists) {
      const gitignoreContent = yield* $(fs.readFile(gitignoreFilePath));

      if (!gitignoreContent.includes(".wesjet")) {
        const newGitignoreContent = `\
${gitignoreContent}

# wesjet cache
.wesjet
`;

        yield* $(fs.writeFile(gitignoreFilePath, newGitignoreContent));
      }
    }
  });
