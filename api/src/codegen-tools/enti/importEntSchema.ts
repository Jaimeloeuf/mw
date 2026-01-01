import type { EntSchemaClass } from "../../entschema/lib/index.js";

import { logger } from "../../logging/index.js";

/**
 * Will not throw on import error, it will return `null` instead.
 */
async function safeDynamicModuleImport<T>(
  entSchemaName: string,
  logOnError?: boolean,
): Promise<T | null> {
  try {
    return await import(`../../entschema/${entSchemaName}.js`);
  } catch (error) {
    if (logOnError) {
      logger.error(safeDynamicModuleImport.name, error);
    }
    return null;
  }
}

/**
 * Import ent schema, will quit and exit if it is not a valid EntSchema.
 */
export async function importEntSchema(entSchemaName: string) {
  const entSchemaModule = await safeDynamicModuleImport<{
    [entSchemaName]: EntSchemaClass;
  }>(entSchemaName);

  if (entSchemaModule === null) {
    logger.error(importEntSchema.name, `EntSchema does not exist`);
    process.exit(1);
  }

  const entSchema = entSchemaModule[entSchemaName];

  // Check if it is a class by checking for the constructor function
  if (entSchema === undefined || typeof entSchema !== "function") {
    logger.error(
      importEntSchema.name,
      `EntSchema module is malformed and does not export a valid EntSchema class. Make sure your EntSchema file and class use the same name`,
    );
    logger.error(importEntSchema.name, `Module found: ${entSchemaModule}`);
    process.exit(1);
  }

  return entSchema;
}
