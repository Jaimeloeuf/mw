# api/src/async/jobs
Define your Async Job Types here.


## Usage
1. Reference the [example job](./example.job.ts) on how an Async Job Type looks like
1. Create a new one with `npm run scripts:create-async-job`
1. These definitions should not be used manually, the `genAsyncJobType*` codegen steps will automatically create the mappings and `asyncJob` namespace.
1. Once a new job is added or a job is deleted, re-run codegen with `npm run codegen:cogenie all` to update generated files.
1. All files must use the `.job.ts` file extension for it to be included during the codegen steps.