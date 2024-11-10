import type { MuwnoTask } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

export default dataFn(async function markTaskAsDone(taskID: MuwnoTask["id"]) {
  await apiDB
    .updateTable("muwno_task")
    .set({
      done: true,
    })
    .where("id", "=", taskID)
    .executeTakeFirstOrThrow();
});
