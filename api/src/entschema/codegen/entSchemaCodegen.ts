import fs from "fs/promises";
import path from "path";
import * as prettier from "prettier";
import ts from "typescript";

import "../../global/bootstrapGlobalDefinitions.js";
import { logger } from "../../logging/index.js";
import { EntJohariSchema } from "../EntJohariSchema.js";
import { EntSchema } from "../lib/index.js";
import { EntSchemaCodegenError } from "./EntSchemaCodegenError.js";
import { generateEntFromEntSchema } from "./generateEntFromEntSchema.js";

type EntSchemaConstructor<T extends EntSchema> = new (...args: any[]) => T;

async function entSchemaCodegen(entSchema: EntSchemaConstructor<EntSchema>) {
  if (!entSchema.name.startsWith("Ent") || !entSchema.name.endsWith("Schema")) {
    throw new EntSchemaCodegenError(
      "EntSchema name must be Ent...Schema where your ent name is filled in the ...",
    );
  }

  const entClassName = entSchema.name.slice(
    0,
    entSchema.name.length - "Schema".length,
  );

  const generatedEntNode = generateEntFromEntSchema(new entSchema(), {
    entClassName,
  });

  const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
    removeComments: false,
  });

  const generatedCode = printer.printNode(
    ts.EmitHint.Unspecified,
    generatedEntNode,
    ts.createSourceFile(
      "_.ts",
      "",
      ts.ScriptTarget.Latest,
      false,
      ts.ScriptKind.TS,
    ),
  );

  const imports = `import { BaseEnt } from "../../ent/BaseEnt.js";\n\n`;

  const generatedCodeWithImports = imports + generatedCode;

  const formattedFile = await prettier.format(generatedCodeWithImports, {
    filepath: ".ts",
  });

  await fs.writeFile(
    path.join(import.meta.dirname, `../__generated/${entClassName}.ts`),
    formattedFile,
  );

  logger.info(
    entSchemaCodegen.name,
    `Generated '${entClassName}' from '${entSchema.name}'`,
  );
}

entSchemaCodegen(EntJohariSchema);
