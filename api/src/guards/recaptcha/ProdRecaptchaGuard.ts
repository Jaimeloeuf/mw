import { sf } from "simpler-fetch";
import type { Request } from "express";
import { HttpRequestGuard } from "../../http/index.js";
import {
  UnauthorizedException,
  ForbiddenException,
} from "../../exceptions/index.js";
import { prettyPrintJson } from "../../utils/index.js";

export class ProdRecaptchaGuard implements HttpRequestGuard {
  constructor(
    /**
     * The recaptcha secret token
     */
    private readonly recaptchaSecret: string,

    /**
     * Minimum recaptcha score required to pass as human. This should be a
     * number between 0 and 1, where the higher it is the more human it is.
     */
    private readonly scoreRequirement: number = 0.5
  ) {}

  async check(req: Request) {
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
        `https://www.recaptcha.net/recaptcha/api/siteverify?secret=${this.recaptchaSecret}&response=${token}&remoteip=${remoteIP}`
      )
      .POST()
      .runJSON<{ success: string; score: number; ["error-codes"]: any }>();

    if (err !== undefined) {
      throw new Error(
        `Failed to verify recaptcha token: ${err.name}: ${err.message}`
      );
    }

    if (!res.data.success) {
      throw new ForbiddenException(prettyPrintJson(res.data["error-codes"]));
    }

    if (res.data.score < this.scoreRequirement) {
      throw new ForbiddenException(
        `Recaptcha score too low: ${res.data.score}`
      );
    }
  }
}
