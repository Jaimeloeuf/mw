import type { MuwnoUser } from "../../kysely/index.js";

import {
  NotFoundException,
  InvalidInternalStateException,
} from "../../../exceptions/index.js";
import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Check if given user completed onboarding.
 *
 * To be considered onboarded
 * 1. User must have an Org
 * 2. The org must have a valid subscription
 */
export default dataFn(async function isUserOnboarded(userID: MuwnoUser["id"]) {
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
});
