import type { BaseEnt } from "../../ent/BaseEnt.js";
import type { EntSchemaClass } from "./EntSchemaClass.js";
import type { EntSchemaValidatedData } from "./EntSchemaValidatedData.js";

import { entMapping } from "../../__generated/index.js";
import { logger } from "../../logging/index.js";
import { EntRuntimeError } from "./EntRuntimeError.js";
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

  const entClass = entMapping[entSchemaInstance.EntTypeID];
  if (entClass === undefined) {
    throw new EntSchemaSetupAndValidationError(
      `Cannot find '${entClassName}' in EntTypeID to Ent mapping`,
    );
  }

  // @todo Use a proper generic type instead of using any here
  // @todo Validate that it is a valid table name in DB definitions
  const entSchemaDbTable = entSchemaInstance.EntDbTable as any;

  const entSchemaFieldConfigs = entSchemaInstance.getFieldConfigs();
  const entSchemaFieldToStorageKeyMap: Record<string, string> = {};
  const entSchemaStorageKeyToFieldMap: Record<string, string> = {};
  for (const fieldConfig of entSchemaFieldConfigs) {
    entSchemaFieldToStorageKeyMap[fieldConfig.field] = fieldConfig.storageKey;
    entSchemaStorageKeyToFieldMap[fieldConfig.storageKey] = fieldConfig.field;
  }

  // @todo Use proper generic types instead of using any here
  function mapObjectToEntWithStorageKeys(data: Record<string, any>): any {
    const objectWithFields: Record<string, string> = {};
    for (const [key, value] of Object.entries(data)) {
      const field = entSchemaStorageKeyToFieldMap[key];
      if (field === undefined) {
        throw new EntRuntimeError(`Invalid key: ${key}`);
      }
      objectWithFields[field] = value;
    }
    return objectWithFields;
  }

  // @todo Use a proper generic return type instead of using any here
  function mapEntToObjectWithStorageKeys(ent: BaseEnt): any {
    const objectWithStorageKeys: Record<string, string> = {};
    for (const [key, value] of Object.entries(ent.data)) {
      const storageKey = entSchemaFieldToStorageKeyMap[key];
      if (storageKey === undefined) {
        throw new EntRuntimeError(`Invalid key: ${key}`);
      }
      // @todo Handle type
      objectWithStorageKeys[storageKey] = value as any;
    }
    return objectWithStorageKeys;
  }

  return {
    entClass,
    entSchema,
    entClassName,
    entSchemaInstance,
    entSchemaDbTable,
    mapObjectToEntWithStorageKeys,
    mapEntToObjectWithStorageKeys,
  };
}
