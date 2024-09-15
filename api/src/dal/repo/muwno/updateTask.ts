import { apiDB } from "../../kysely/index.js";
import type { MuwnoTask, UpdateMuwnoTask } from "../../kysely/index.js";

export async function updateTask(
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
}
