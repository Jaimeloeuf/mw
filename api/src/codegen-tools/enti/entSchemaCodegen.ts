import fs from "fs/promises";
import path from "path";
import { format as prettierFormatter } from "prettier";
import ts from "typescript";

import "../../global/bootstrapGlobalDefinitions.js";

import type { EntSchemaValidatedData } from "../../entschema/lib/index.js";

import { logger } from "../../logging/index.js";
import { generateEntFromEntSchema } from "./generateEntFromEntSchema.js";
import { generateEntOperatorsFromEntSchema } from "./generateEntOperatorsFromEntSchema.js";

async function entSchemaCodegen({
  entSchema,
  entClassName,
  entSchemaInstance,
}: EntSchemaValidatedData) {
  const generatedEntNode = generateEntFromEntSchema(entSchemaInstance, {
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

  const formattedFile = await prettierFormatter(generatedCodeWithImports, {
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

async function codegenCrudOperators({
  entSchema,
  entClassName,
  entSchemaInstance,
}: EntSchemaValidatedData) {
  const generatedEntNode = generateEntOperatorsFromEntSchema(
    entSchemaInstance,
    {
      entClassName,
    },
  );

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

  const imports = `import { apiDB } from "../../dal/kysely/index.js";
import { defineEntOperators } from "../../ent/index.js";
import { EntBlog } from "./EntBlog.js";
\n\n`;

  const generatedCodeWithImports = imports + generatedCode;

  // @todo
  const formattedFile = generatedCodeWithImports;
  // const formattedFile = await prettier.format(generatedCodeWithImports, {
  //   filepath: ".ts",
  // });

  await fs.writeFile(
    path.join(
      import.meta.dirname,
      `../__generated/${entClassName}Operators.ts`,
    ),
    formattedFile,
  );

  logger.info(
    entSchemaCodegen.name,
    `Generated '${entClassName}Operators' from '${entSchema.name}'`,
  );
}

async function test() {
  const { EntJohariSchema } = await import(
    "../../entschema/EntJohariSchema.js"
  );
  const entSchemaValidatedData = EntJohariSchema.validateAndSetup();
  // @todo Run codegen in parallel after schema verification
  await entSchemaCodegen(entSchemaValidatedData);
  await codegenCrudOperators(entSchemaValidatedData);
}
test();
