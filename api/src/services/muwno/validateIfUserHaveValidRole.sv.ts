import { df } from "../../__generated/index.js";
import { ForbiddenException } from "../../exceptions/index.js";
import type { MuwnoUser } from "../../dal/index.js";

/**
 * Validate if a user have at least one of the specified user roles.
 *
 * Throws `ForbiddenException` if user does not have any of the given roles.
 *
 * An optional error message can be used to override the default invalid role
 * error message.
 */
export default async function (
  userID: string,
  roles: Array<MuwnoUser["role"]>,
  errorMessage?: string,
) {
  const user = await df.muwnoGetUser.getResultOrThrowOnError(userID);

  if (user.role === null || !roles.includes(user.role)) {
    throw new ForbiddenException(
      errorMessage ??
        `User '${userID}' does not have a valid role for this action.`,
    );
  }
}