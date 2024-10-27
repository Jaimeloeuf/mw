# api/src/codegen/
Folder for all `codegen` (Code Generation) modules.


## Intro
1. `codegen` is a collection of scripts that is a PART of the build process that ALWAYS run to generate code needed in order for the codebase to run.
1. Code generators here are used to generate source code in `/src/__generated/` and in `/docs`.
1. Generated source code always have the `.generated.file_prefix` appended to their names, where file prefix is either `.ts` or `.md`.


## Running codegen
You can either run all codegen modules, or run a single codegen module directly. Either ways, you should use the codegen CLI tool.

### See all codegen options
```bash
npm run codegen
```

### Run all
```bash
npm run codegen all
```

### Run a single codegen module only
```bash
npm run codegen genYourCodegenName
```

**Do not run codegen files directly** with something like `npx tsx ./src/codegen/genCodegenStep/genCodegenStep.ts`, because this might cause issues and even fail, for e.g. since the path is relative to where the code is ran, it will not work.


## Creating a new codegen module/step
1. Create a new folder, whose name must start with a `gen` prefix followed by the name of your module, e.g. `genGraphqlSchema`.
1. Create a new TS file with the same name as the folder.
1. Inside your TS file, export a function of the same name.
1. Within this codegen function, you can implement whatever logic you need to generate code.


## Codegen function notes
1. Codegen functions must be treated as independent codegen steps, where they will all be ran concurrently, so your codegen function cannot depend on execution order.
    1. *Might be changed in the future to support DAG based dependency and execution order definition.