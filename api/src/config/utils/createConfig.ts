import type { ZodType } from "zod";

/**
 * Utility function to create a config mapping, which is just a const asserted
 * object mapping containing the ZodSchema, ConfigLoader and other values.
 */
export function createConfig<
  const ConfigSchema extends ZodType,
  const ConfigLoader extends () => any,
>(
  /**
   * A zod validator for the config value from config loader called to make sure
   * it is of the right type at runtime on first use.
   */
  configSchema: ConfigSchema,

  /**
   * configLoader can be any loader function that loads the config value from
   * whatever data source from env var to secret keychain over the network, and
   * returns the config value. This can be either a sync or async function.
   *
   * When user uses the config value, this function will be ran and its value
   * is validated/transformed, cached and returned, unless specified otherwise.
   */
  configLoader: ConfigLoader,

  /**
   * Set this to true, if this is a value that should be pre-loaded on server
   * startup regardless of what environment / usecase it serves. For the most
   * general purpose configs like the `node_env` config value.
   */
  loadOnStartup?: true,
) {
  return {
    /**
     * The Zod schema used to validate if the config value returned by the
     * loader function is valid.
     */
    schema: configSchema,

    /**
     * The loader function that actually returns the config value.
     */
    configLoader,

    loadOnStartup,
  } as const;
}
