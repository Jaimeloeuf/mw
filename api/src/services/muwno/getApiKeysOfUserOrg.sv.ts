import { df } from "../../__generated/index.js";

/**
 * Get all the API Keys of the User's Org
 */
export default async function (requestorID: string) {
  const usersOrg =
    await df.muwnoGetOrgOfUser.getResultOrThrowOnError(requestorID);

  const apiKey = await df.muwnoGetApiKeysOfOrg.getResultOrThrowOnError(
    usersOrg.id,
  );

  return apiKey;
}
