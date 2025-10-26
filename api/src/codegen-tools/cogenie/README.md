# Cogenie
"Cogenie the Code Generator" is the main generic codegen-tool focused simple reproducible code generation.


## Intro
1. Cogenie let users define `steps` in the [cogenie/steps](./steps/) folder, where each step is a standalone code generator module.
1. Cogenie is ran from the CLI (see instructions below)
1. This is PART of the build process that ALWAYS run to generate code needed in order for the codebase to run.
1. Code generators here are used to generate source code in `/src/__generated/` and in `/docs`.
1. Generated source code always have the `.generated.file_prefix` appended to their names, where file prefix is either `.ts` or `.md`.
1. Generated code is committed into the repo.


## Running Cogenie
You can either run all cogenie steps, or run a single cogenie step directly. Either ways, you should use the cogenie CLI tool.

### See all Cogenie options
```bash
npm run cogenie
```

### Run all
```bash
npm run cogenie all
```

### Running a single Cogenie step
```bash
npm run cogenie genYourStepName
```

**Do not run Cogenie files directly** with something like `npx tsx ./path/to/your/genCogenieStep.ts`, because this might cause issues and even fail, for e.g. since the path is relative to where the code is ran, it will not work.


## Creating a new Cogenie step
1. Create a new folder, whose name must start with a `gen` prefix followed by the name of your module, e.g. `genGraphqlSchema`.
1. Create a new TS file with the same name as the folder.
1. Inside your TS file, export a function of the same name.
1. Within this Cogenie function, you can implement whatever logic you need to generate code.


## Cogenie function notes
1. Cogenie functions must be treated as independent Cogenie steps, where they will all be ran concurrently, so your Cogenie function cannot depend on execution order.
    1. *Might be changed in the future to support DAG based dependency and execution order definition.