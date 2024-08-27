export const ProdEmailServiceFF = (
  emailAddressForSendFrom: string,
  emailAddressForReplyTo: string,
) =>
  async function ProdEmailService(
    recipientEmail: string,

    /**
     * Email subject
     */
    subject: string,

    /**
     * Notification message. This supports HTML formatting
     */
    message: string,
  ): Promise<void | Error> {
    //
  };
