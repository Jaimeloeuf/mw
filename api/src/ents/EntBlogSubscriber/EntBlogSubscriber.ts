import { BaseEnt } from "../../ent/index.js";

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
}
