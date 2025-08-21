import type { EntSchema, EntSchemaConstructor } from "../lib/index.js";

export type EntSchemaCodegenInput = {
  entSchema: EntSchemaConstructor<EntSchema>;
  entClassName: string;
  entSchemaInstance: EntSchema;
};
