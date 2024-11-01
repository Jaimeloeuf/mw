import { apiDB } from "../../kysely/index.js";
import type { MuwnoTask } from "../../kysely/index.js";
import { NotFoundException } from "../../../exceptions/index.js";

export async function getProductIdOfTask(taskID: MuwnoTask["id"]) {
  const task = await apiDB
    .selectFrom("muwno_task")
    .select("product_id")
    .where("id", "=", taskID)
    .executeTakeFirst();

  if (task === undefined) {
    throw new NotFoundException(`Cannot find task: ${taskID}`);
  }

  return task.product_id;
}
