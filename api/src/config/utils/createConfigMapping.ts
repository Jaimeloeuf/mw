import type { ZodType } from "zod";

/**
 * Utility function to create a new object mapping between a ZodSchema and a
 * config value data source, to add const assertion automatically.
 */
export function createConfigMapping<
  const ConfigSchema extends ZodType,
  const ConfigDatasource,
>(configSchema: ConfigSchema, configDatasource: ConfigDatasource) {
  return {
    schema: configSchema,
    datasource: configDatasource,
  } as const;
}
