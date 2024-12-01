# api/src/config/
Config module.


## How to add new config values / edit existing ones?
1. Find where your config is and open the config file, configs are grouped by
    1. [Generic monorepo configs](./configMappings/genericMonoRepoConfig.ts)
    1. [App specific configs (grouped by app)](./configMappings/appSpecificConfig.ts)
    1. [Shared infra configs](./configMappings/sharedInfraConfig.ts)
1. Edit the config file, see other config values for reference


## What is `config` and how it works
The exported `config` symbol is an object with a bunch of [`ConfigLoader`](./ConfigLoader.ts) functions attached to it.

You can run the config loader like `config.myConfigValue()` to get your config value, and it will be correctly typed based on your config definition.

Config loader functions can be both synchronous (e.g. reading values from env var) and asynchronous (e.g. reading values from a secrets store over the network), and the return value of the config loader will be typed accordingly to `T` or `Promise<T>`.

A config value definition consists of
1. A `configLoader` function responsible for loading the config value from whenever and returning it
1. A `zod` schema to validate the value returned by `configLoader` to ensure it is of the correct type

How it works when you run the config loader like `config.myConfigValue(forceReload?: true)`
1. Checks if the config value have been loaded before, if so, return the cached value.
1. If user specified to force reload the config value, regardless of whether it is cached, re-run the loading process
1. If value has not be cached before or if force reloaded
    1. Config value is loaded using the provided `configLoader` function
    1. The return value from `configLoader` is validated by parsing it using the provided `zod` schema
    1. The parsed and validated value is cached
    1. Return the cached value

All config values are lazily loaded on first use, unless the `loadOnStartup` option is used when defining the config value. Which when used, all the config values with `loadOnStartup` option is loaded, validated and cached first. Think of these values as required no matter what environment/situation is the monorepo used in.


## Why is it designed like this?
This is used for situations when you only need a subset of config values, and do not want to put all env vars / config values onto a platform just to perform certain actions.

Examples include if using the same monorepo to run a DB script as part of a CI pipeline, we do not want to put all other config values env var input in the CI environment.

And also since this is a single monorepo with multiple apps, sometimes we may not want to run all of them at once, like in a script environment or what not.

However sometimes we still want to validate at startup that all the required configs are available for whatever situation we are in / want to have, so what we can do, is call `loadAndValidateConfig` and block at the starting bootstrap function until it completes.