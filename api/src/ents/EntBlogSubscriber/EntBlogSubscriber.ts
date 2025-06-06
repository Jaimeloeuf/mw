import { BaseEnt } from "../../ent/index.js";

export class EntBlogSubscriber extends BaseEnt {
  static override EntTypeID = "0dda";

  constructor(
    public readonly data: {
      readonly id: string;
      readonly createdAt: $DateTime.ISO.DateTime.Strong;
      updatedAt: $DateTime.ISO.DateTime.Strong;

      /**
       * Which blog is this subscriber subscribed to?
       */
      blogID: string;

      /**
       * Subscriber's email
       */
      email: string;
    },
  ) {
    super();
  }
}
