# api/src/config/
Generic config value module.

There are 2 config modules, `config` and `lazyConfig`.


## config
This is based on synchronously loadable config values, like values that are read from environment variables and etc...

When using `config`, it will bootstrap by loading all the config values at startup, which means all the config values must be available when using `config` module even if you only need some of the values.


## lazyConfig
This is similar to `config`, except it only lazily loads a config value the first time it is accessed, and caches it for future uses.

This is used for situations when you only need a subset of config values, and do not want to put all env vars onto a platform just to perform certain actions. Examples include if using the same monorepo to run a DB script as part of a CI pipeline, we do not want to put all other config values env var input in the CI environment.

Use this by importing from the `lazyConfig` file directly instead of importing it from the index barrel file so that `bootstrapConfig` isnt triggered and cause errors.