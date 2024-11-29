/**
 * Type of the config loader, i.e. type of `config.my_config_value()`
 */

export type ConfigLoader<T = unknown> = (forceReload?: true) => T | Promise<T>;
