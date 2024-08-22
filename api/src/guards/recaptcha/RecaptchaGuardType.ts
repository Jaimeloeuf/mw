import type { HttpRequestGuardFF } from "../../http/index.js";

export type RecaptchaGuardFFType = HttpRequestGuardFF<
  [
    /**
     * The recaptcha secret token
     */
    recaptchaSecret: string,

    /**
     * Minimum recaptcha score required to pass as human. This should be a
     * number between 0 and 1, where the higher it is the more human it is.
     */
    scoreRequirement?: number,
  ],
  {
    recaptchaScore: number;
  }
>;
