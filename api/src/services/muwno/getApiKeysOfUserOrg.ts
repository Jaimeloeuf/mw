import { df } from "../../__generated/index.js";

/**
 * Get all the API Keys of the User's Org
 */
export async function getApiKeysOfUserOrg(requestorID: string) {
  const usersOrg = await df.getOrgOfUser.getResultOrThrowOnError(requestorID);

  const apiKey = await df.getApiKeysOfOrg.getResultOrThrowOnError(usersOrg.id);

  return apiKey;
}
