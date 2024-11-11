import type { MuwnoTask } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

export default dataFn(async function muwnoDeleteTask(taskID: MuwnoTask["id"]) {
  await apiDB.deleteFrom("muwno_task").where("id", "=", taskID).execute();
});
