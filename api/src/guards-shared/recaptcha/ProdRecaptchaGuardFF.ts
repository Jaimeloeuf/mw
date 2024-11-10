import type { Request } from "express";

import { sf } from "simpler-fetch";

import type { RecaptchaGuardFFType } from "./RecaptchaGuardType.js";

import {
  UnauthorizedException,
  ForbiddenException,
} from "../../exceptions/index.js";
import { prettyPrintJson } from "../../utils/index.js";

export const ProdRecaptchaGuardFF: RecaptchaGuardFFType = (
  /**
   * The recaptcha secret token
   */
  recaptchaSecret: string,

  /**
   * Minimum recaptcha score required to pass as human. This should be a
   * number between 0 and 1, where the higher it is the more human it is.
   */
  scoreRequirement: number = 0.5,
) =>
  async function ProdRecaptchaGuard(req: Request) {
    // Get the remote IP address of the user, since this service will be ran
    // behind a proxy, `x-forwarded-for` is used first to prevent using the
    // proxy's IP address as the value since it is always the same.
    const remoteIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Get recaptcha token passed in as header (express lowercases all headers)
    const token = req.headers["x-recaptcha-token"];

    if (token === undefined || token === "") {
      throw new UnauthorizedException("Missing recaptcha token");
    }

    const { err, res } = await sf
      .useOnce(
        `https://www.recaptcha.net/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${token}&remoteip=${remoteIP}`,
      )
      .POST()
      .runJSON<{ success: string; score: number; ["error-codes"]: any }>();

    if (err !== undefined) {
      // This should be a more specific one.... maybe service error or smth?
      throw new Error(
        `Failed to verify recaptcha token: ${err.name}: ${err.message}`,
      );
    }

    if (!res.data.success) {
      throw new ForbiddenException(prettyPrintJson(res.data["error-codes"]));
    }

    if (res.data.score < scoreRequirement) {
      throw new ForbiddenException(
        `Recaptcha score too low: ${res.data.score}`,
      );
    }

    return { recaptchaScore: res.data.score };
  };
