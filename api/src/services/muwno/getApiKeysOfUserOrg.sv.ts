import { df } from "../../__generated/index.js";

/**
 * Get all the API Keys of the User's Org
 */
export default async function (requestorID: string) {
  const usersOrg = await df.muwnoGetOrgOfUser.runAndThrowOnError(requestorID);

  const apiKey = await df.muwnoGetApiKeysOfOrg.runAndThrowOnError(usersOrg.id);

  return apiKey;
}
