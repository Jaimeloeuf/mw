import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { MuwnoTask } from "../../kysely/index.js";
import { NotFoundException } from "../../../exceptions/index.js";

export default dataFn(async function getTask(taskID: MuwnoTask["id"]) {
  const task = await apiDB
    .selectFrom("muwno_task")
    .selectAll()
    .where("id", "=", taskID)
    .executeTakeFirst();

  if (task === undefined) {
    throw new NotFoundException(`Cannot find task: ${taskID}`);
  }

  return task;
});
