import type { EntSchemaClass } from "./EntSchemaClass.js";
import type { EntSchemaValidatedData } from "./EntSchemaValidatedData.js";

import { logger } from "../../logging/index.js";
import { EntSchemaSetupAndValidationError } from "./EntSchemaSetupAndValidationError.js";

/**
 * Validate a given EntSchema and set it up for use by other modules
 */
export function EntSchemaValidateAndSetup(
  entSchema: EntSchemaClass,
): EntSchemaValidatedData {
  logger.info(
    EntSchemaValidateAndSetup.name,
    `Validating and Setting up ${entSchema.name}`,
  );

  if (!entSchema.name.startsWith("Ent") || !entSchema.name.endsWith("Schema")) {
    throw new EntSchemaSetupAndValidationError(
      "EntSchema name must be 'Ent...Schema' where your ent name is filled in the '...'",
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
