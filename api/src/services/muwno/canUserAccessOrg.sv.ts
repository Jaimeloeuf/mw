import { df } from "../../__generated/index.js";
import { ForbiddenException } from "../../exceptions/index.js";

/**
 * Validate if a user have access permission to an Org.
 *
 * Throws the common `ForbiddenException` if user does not have access.
 *
 * Treats invalid/non-existent `orgID` as Forbidden request.
 */
export default async function (userID: string, orgID: string) {
  const canAccess = await df.muwnoCanUserAccessOrg.runAndThrowOnError(
    userID,
    orgID,
  );

  if (!canAccess) {
    throw new ForbiddenException(
      `User ${userID} does not have permission to access Org '${orgID}'.`,
    );
  }
}
