import type { AsyncJob } from "../../../async/AsyncJob.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";
import { mapAsyncJobToDbAsyncJob } from "./mapAsyncJobToDbAsyncJob.js";

export default dataFn(async function asyncCreateJob(job: AsyncJob) {
  await apiDB
    .insertInto("async_job")
    .values(mapAsyncJobToDbAsyncJob(job))
    .returningAll()
    .executeTakeFirstOrThrow();
});
