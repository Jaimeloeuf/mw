/**
 * Partial Github User object sent back during the github OAuth callback.
 */
export interface GitHubUser {
  id: number;

  // Username
  login: string;
  name: string;

  // Should check if it is verified
  email: string;
}
