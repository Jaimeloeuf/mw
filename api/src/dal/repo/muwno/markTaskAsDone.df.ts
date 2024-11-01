import { apiDB } from "../../kysely/index.js";
import type { MuwnoTask } from "../../kysely/index.js";

export async function markTaskAsDone(taskID: MuwnoTask["id"]) {
  await apiDB
    .updateTable("muwno_task")
    .set({
      done: true,
    })
    .where("id", "=", taskID)
    .executeTakeFirstOrThrow();
}
