import { BaseEnt } from "../lib/index.js";

export class EntBlogSubscriber extends BaseEnt {
  static override EntTypeID = "0dda";

  constructor(
    public readonly data: {
      readonly id: string;
      readonly createdAt: Date;
      updatedAt: Date;

      /**
       * Subscriber's email
       */
      email: string;
    },
  ) {
    super();
  }

  static override jsonParse(jsonString: string): EntBlogSubscriber {
    return new EntBlogSubscriber(JSON.parse(jsonString));
  }
}
