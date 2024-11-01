import { apiDB } from "../../kysely/index.js";
import type { MuwnoUser } from "../../kysely/index.js";
import {
  NotFoundException,
  InvalidInternalStateException,
} from "../../../exceptions/index.js";

export async function isUserOnboarded(userID: MuwnoUser["id"]) {
  const user = await apiDB
    .selectFrom("muwno_user")
    .select("org_id")
    .where("id", "=", userID)
    .executeTakeFirst();

  if (user === undefined) {
    throw new NotFoundException(`Cannot find user: ${userID}`);
  }

  if (user.org_id === null) {
    return false;
  }

  const org = await apiDB
    .selectFrom("muwno_org")
    .select("subscribed")
    .where("id", "=", user.org_id)
    .executeTakeFirst();

  if (org === undefined) {
    throw new InvalidInternalStateException(
      `User '${userID}' has an invalid org_id '${user.org_id}'`,
    );
  }

  return org.subscribed;
}
