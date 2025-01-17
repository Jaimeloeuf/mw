import { BaseEnt } from "../../ent/index.js";

export class EntBlog extends BaseEnt {
  static override EntTypeID = "40ba";

  constructor(
    public readonly data: {
      readonly id: string;
      readonly createdAt: Date;
      updatedAt: Date;

      /**
       * Name of the blog
       */
      name: string;

      /**
       * Owner's email
       */
      ownerEmail: string;
    },
  ) {
    super();
  }
}
