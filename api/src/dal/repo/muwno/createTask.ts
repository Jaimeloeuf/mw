import { apiDB } from "../../kysely/index.js";
import type { CreateMuwnoTask } from "../../kysely/index.js";

export async function createTask(task: CreateMuwnoTask) {
  return apiDB
    .insertInto("muwno_task")
    .values(task)
    .returningAll()
    .executeTakeFirstOrThrow();
}
