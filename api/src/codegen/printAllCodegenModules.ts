import fs from "fs";

export function printAllCodegenModules() {
  const dirents = fs.readdirSync(import.meta.dirname, {
    withFileTypes: true,
  });

  const codegenModuleFolders = dirents
    .filter((dirent) => dirent.isDirectory() && dirent.name.startsWith("gen"))
    .map((dirent) => dirent.name);

  /* eslint-disable no-console */
  console.log("These are the available codegen modules:");
  codegenModuleFolders.forEach((codegenModule, i) =>
    console.log(`${i + 1}) ${codegenModule}`),
  );
  console.log();
  /* eslint-enable no-console */
}
