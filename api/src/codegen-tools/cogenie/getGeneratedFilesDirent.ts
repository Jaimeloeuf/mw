import fs from "fs/promises";

import { codegenForTs, codegenForDoc } from "../../codegen-lib/index.js";

export async function getGeneratedFilesDirent() {
  const generatedCodeFilesDirent = await fs
    .readdir(codegenForTs.generatedSrcDirPath, {
      recursive: true,
      withFileTypes: true,
    })
    .then((dirent) =>
      // Filter for generated files
      dirent.filter(
        (file) =>
          file.isFile() &&
          (file.name.endsWith(codegenForTs.generatedCodeFileExtension) ||
            file.name.endsWith(
              codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusion,
            ) ||
            file.name === "index.ts"),
      ),
    );

  const generatedDocFilesDirent = await fs
    .readdir(codegenForDoc.generatedDocDirPath, {
      recursive: true,
      withFileTypes: true,
    })
    .then((dirent) =>
      // Filter for generated files
      dirent.filter(
        (file) =>
          file.isFile() &&
          file.name.endsWith(codegenForDoc.generatedDocFileExtension),
      ),
    );

  const generatedFilesDirent = [
    ...generatedCodeFilesDirent,
    ...generatedDocFilesDirent,
  ];

  return generatedFilesDirent;
}
