import type { EntSchema } from "../lib/EntSchema.js";
import type { EntSchemaConstructor } from "../lib/EntSchemaConstructor.js";
import { EntSchemaCodegenError } from "./EntSchemaCodegenError.js";
import type { EntSchemaCodegenInput } from "./EntSchemaCodegenInput.js";

export function codegenSetup(
  entSchema: EntSchemaConstructor<EntSchema>,
): EntSchemaCodegenInput {
  if (!entSchema.name.startsWith("Ent") || !entSchema.name.endsWith("Schema")) {
    throw new EntSchemaCodegenError(
      "EntSchema name must be Ent...Schema where your ent name is filled in the ...",
    );
  }

  const entClassName = entSchema.name.slice(
    0,
    entSchema.name.length - "Schema".length,
  );

  const entSchemaInstance = new entSchema();

  return {
    entSchema,
    entClassName,
    entSchemaInstance,
  };
}
