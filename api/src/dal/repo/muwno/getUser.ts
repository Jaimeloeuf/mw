import { apiDB } from "../../kysely/index.js";
import { NotFoundException } from "../../../exceptions/index.js";

export async function getUser(userID: string) {
  const user = await apiDB
    .selectFrom("muwno_user")
    .selectAll()
    .where("id", "=", userID)
    .executeTakeFirst();

  if (user === undefined) {
    throw new NotFoundException(`Cannot find user: ${userID}`);
  }

  return user;
}
