import { muwnoRepo } from "../../dal/index.js";

/**
 * Get all the API Keys of the User's Org
 */
export async function getApiKeysOfUserOrg(requestorID: string) {
  const usersOrg =
    await muwnoRepo.getOrgOfUser.getResultOrThrowOnError(requestorID);

  const apiKey = await muwnoRepo.getApiKeysOfOrg.getResultOrThrowOnError(
    usersOrg.id,
  );

  return apiKey;
}
