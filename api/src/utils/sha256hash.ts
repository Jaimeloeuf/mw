import { createHash } from "crypto";

/**
 * Generates a base64 URL encoded SHA-256 hash for the given string input.
 */
export const sha256hash = (value: string) =>
  createHash("sha256").update(value).digest("base64url");
