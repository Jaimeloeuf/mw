import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import { injectID, OptionalID } from "../injectID.js";
import type { CreateMuwnoTask } from "../../kysely/index.js";

export default dataFn(function createTask(task: OptionalID<CreateMuwnoTask>) {
  return apiDB
    .insertInto("muwno_task")
    .values(injectID(task))
    .returningAll()
    .executeTakeFirstOrThrow();
});
