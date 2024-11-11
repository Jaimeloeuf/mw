import type { MuwnoTask } from "../../kysely/index.js";

import { NotFoundException } from "../../../exceptions/index.js";
import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Get `ProductID` of a given task.
 */
export default dataFn(async function muwnoGetProductIdOfTask(
  taskID: MuwnoTask["id"],
) {
  const task = await apiDB
    .selectFrom("muwno_task")
    .select("product_id")
    .where("id", "=", taskID)
    .executeTakeFirst();

  if (task === undefined) {
    throw new NotFoundException(`Cannot find task: ${taskID}`);
  }

  return task.product_id;
});
