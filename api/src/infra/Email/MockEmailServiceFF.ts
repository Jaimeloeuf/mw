import type { ProdEmailServiceFF } from "./ProdEmailServiceFF.js";

import { simpleLogger } from "../../logging/index.js";
import { json } from "../../utils/index.js";

export const MockEmailServiceFF = ((
  emailAddressForSendFrom: string,
  emailAddressForReplyTo: string,
) =>
  async function MockEmailService(
    recipientEmail: string,

    /**
     * Email subject
     */
    subject: string,

    /**
     * Notification message. This supports HTML formatting
     */
    message: string,
  ) {
    simpleLogger.info(
      MockEmailService.name,
      json.stringifyPretty({
        emailAddressForSendFrom,
        emailAddressForReplyTo,
        recipientEmail,
        subject,
        message,
      }),
    );
  }) satisfies typeof ProdEmailServiceFF;
