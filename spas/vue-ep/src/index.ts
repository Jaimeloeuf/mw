import fs from "fs/promises";
import path from "path";
import express from "express";
import { tsImport } from "tsx/esm/api";
import { compileTemplate, parse } from "vue/compiler-sfc";

const rootHtml = await fs.readFile(
  path.resolve(import.meta.dirname, "../dist/index.html"),
  "utf8"
);

async function returnRootHtml(_: unknown, res: express.Response) {
  res.status(200).send(rootHtml);
}

/**
 * Create a new router, where all the route handlers are created using
 * entrypoint file definitions.
 */
async function createEntrypointRouter() {
  const entrypointRouter = express.Router();

  const entrypointDefinitions = await fs.readdir(
    path.resolve(import.meta.dirname, "./entrypoints"),
    { withFileTypes: true }
  );

  // Create a new route handler for every single entrypoint definition
  for (const entrypointDefinition of entrypointDefinitions) {
    const entrypointModulePath = path.resolve(
      entrypointDefinition.parentPath,
      entrypointDefinition.name
    );

    // Import the entrypoint definition file dynamically
    // Cannot use `import` directly since it does not support loading .ts files
    const importedEntrypointModule = await tsImport(
      entrypointModulePath,
      import.meta.url
    ).then((mdule) => mdule.default);

    const sfcFilePath = path.resolve(
      import.meta.dirname,
      "./pages",
      importedEntrypointModule["component"]
    );

    const sfcFile = await fs.readFile(sfcFilePath, "utf8");

    const parsedSfcFile = parse(sfcFile);

    if (
      parsedSfcFile.errors.length > 0 ||
      parsedSfcFile.descriptor.template === null
    ) {
      throw new Error(
        `Failed to parse SFC: ${JSON.stringify(parsedSfcFile.errors)}`
      );
    }

    const compiled = compileTemplate({
      id: sfcFilePath,
      filename: importedEntrypointModule["component"],
      source: sfcFile,
      ast: parsedSfcFile.descriptor.template.ast,
    }).code;

    // Return the root HTML page if they load the path directly
    entrypointRouter.get(importedEntrypointModule["path"], returnRootHtml);

    // Return just the page's component if they loading it dynamically
    entrypointRouter.get(
      "/entrypoint" + importedEntrypointModule["path"],
      (_, res) => {
        res.contentType("application/javascript").status(200).send(compiled);
      }
    );
  }

  return entrypointRouter;
}

async function bootstrapHttpServer() {
  express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }))

    // Simple logging middleware for debugging
    .use((req, _res, next) => {
      console.log(req.method, req.url);
      next();
    })

    .get("/", returnRootHtml)

    .use(await createEntrypointRouter())

    .use(express.static("dist"))

    .use((_, res) => {
      res.status(404).send();
    })

    .listen(8080, () => console.log("Server running on 8080"));
}

bootstrapHttpServer();
