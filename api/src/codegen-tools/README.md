# api/src/codegen-tools/
Folder for all `codegen` (Code Generation) tools.

1. There are many different usecases for codegen artifacts and different approaches to codegen, e.g. one off scaffolding codegen vs reproducible codegen
1. Therefore there are different codegen tools in the repo, each with their own usecases
1. See the individual codegen tool folder README for more detail of each specific codegen tool
1. All codegen tools are triggerable via `npm run codegen:$CodegenToolName ...optional arguments...` where `$CodegenToolName` is the specific name of the tool