import type { Database } from "../../dal/index.js";
import type { EntSchema } from "./EntSchema.js";
import type { EntSchemaConstructor } from "./EntSchemaConstructor.js";

/**
 * Data object holding all the data needed for all EntSchema related operations
 * generated after EntSchema validation and setup.
 */
export type EntSchemaValidatedData = {
  entSchema: EntSchemaConstructor<EntSchema>;
  entClassName: string;
  entSchemaInstance: EntSchema;
  entSchemaDbTable: keyof Database;
};
