/**
 * Pseudo Random generator for alphanumeric [a-z, 0-9] strings.
 *
 * ## DO NOT USE FOR SECURE USECASES
 */
export function pseudoRandomAlphanumericString(length: number) {
  const characterSet = "0123456789abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characterSet[Math.floor(Math.random() * characterSet.length)];
  }
  return result;
}
