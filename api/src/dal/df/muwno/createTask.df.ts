import type { CreateMuwnoTask } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";
import { injectID, OptionalID } from "../injectID.js";

export default dataFn(function muwnoCreateTask(task: OptionalID<CreateMuwnoTask>) {
  return apiDB
    .insertInto("muwno_task")
    .values(injectID(task))
    .returningAll()
    .executeTakeFirstOrThrow();
});
