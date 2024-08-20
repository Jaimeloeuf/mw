import type { HttpRequestGuardFunction } from "../../http/index.js";

export type RecaptchaGuardType = HttpRequestGuardFunction<{
  recaptchaScore: number;
}>;

export type RecaptchaGuardFFType = (
  /**
   * The recaptcha secret token
   */
  recaptchaSecret: string,

  /**
   * Minimum recaptcha score required to pass as human. This should be a
   * number between 0 and 1, where the higher it is the more human it is.
   */
  scoreRequirement?: number
) => HttpRequestGuardFunction<{
  recaptchaScore: number;
}>;
