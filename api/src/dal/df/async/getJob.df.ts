import type { AsyncJob } from "../../kysely/index.js";

import { NotFoundException } from "../../../exceptions/index.js";
import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";
import { mapDbAsyncJobToAsyncJob } from "./mapDbAsyncJobToAsyncJob.js";

export default dataFn(async function asyncGetJob(asyncJobID: AsyncJob["id"]) {
  const asyncJob = await apiDB
    .selectFrom("async_job")
    .selectAll()
    .where("id", "=", asyncJobID)
    .executeTakeFirst();

  if (asyncJob === undefined) {
    throw new NotFoundException(`Cannot find Async Job '${asyncJobID}'`);
  }

  return mapDbAsyncJobToAsyncJob(asyncJob);
});
