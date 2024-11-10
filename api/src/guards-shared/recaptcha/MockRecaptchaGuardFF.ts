import type { Request } from "express";

import type { RecaptchaGuardFFType } from "./RecaptchaGuardType.js";

import { ForbiddenException } from "../../exceptions/index.js";

export const MockRecaptchaGuardFF: RecaptchaGuardFFType = () =>
  async function MockRecaptchaGuard(req: Request) {
    // Get recaptcha token passed in as header (express lowercases all headers)
    const token = req.headers["x-recaptcha-token"];

    if (token === undefined || token === "") {
      throw new ForbiddenException("Missing recaptcha token");
    }

    return { recaptchaScore: 1 };
  };
