import type { AsyncJob } from "../../../async/AsyncJob.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";
import { mapAsyncJobToDbAsyncJob } from "./mapAsyncJobToDbAsyncJob.js";

export default dataFn(async function asyncUpdateJob(job: AsyncJob) {
  await apiDB
    .updateTable("async_job")
    .where("id", "=", job.id)
    .set(mapAsyncJobToDbAsyncJob(job))
    .returningAll()
    .executeTakeFirstOrThrow();
});
