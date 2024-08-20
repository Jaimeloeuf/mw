import type { Request } from "express";
import { ForbiddenException } from "../../exceptions/index.js";
import type { RecaptchaGuardFFType } from "./RecaptchaGuardType.js";

export const MockRecaptchaGuardFF: RecaptchaGuardFFType = () =>
  async function (req: Request) {
    // Get recaptcha token passed in as header (express lowercases all headers)
    const token = req.headers["x-recaptcha-token"];

    if (token === undefined || token === "") {
      throw new ForbiddenException("Missing recaptcha token");
    }

    return { recaptchaScore: 1 };
  };
