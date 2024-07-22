import type { Request } from "express";
import { ProdRecaptchaGuard } from "./ProdRecaptchaGuard.js";
import { ForbiddenException } from "../../exceptions/index.js";

export class MockRecaptchaGuard extends ProdRecaptchaGuard {
  override async check(req: Request): Promise<void> {
    // Get recaptcha token passed in as header (express lowercases all headers)
    const token = req.headers["x-recaptcha-token"];

    if (token === undefined || token === "") {
      throw new ForbiddenException("Missing recaptcha token");
    }
  }
}
