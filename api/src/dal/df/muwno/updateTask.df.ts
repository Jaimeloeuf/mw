import type { MuwnoTask, UpdateMuwnoTask } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

export default dataFn(function muwnoUpdateTask(
  taskID: MuwnoTask["id"],
  task: UpdateMuwnoTask["task"],
) {
  return apiDB
    .updateTable("muwno_task")
    .set({
      task,
    })
    .where("id", "=", taskID)
    .returningAll()
    .executeTakeFirstOrThrow();
});
