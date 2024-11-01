import { apiDB } from "../../kysely/index.js";
import type { MuwnoTask } from "../../kysely/index.js";

export async function deleteTask(taskID: MuwnoTask["id"]) {
  await apiDB.deleteFrom("muwno_task").where("id", "=", taskID).execute();
}
