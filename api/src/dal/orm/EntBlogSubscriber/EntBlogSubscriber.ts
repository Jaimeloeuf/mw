import { BaseEnt } from "../lib/index.js";

export class EntBlogSubscriber extends BaseEnt {
  static override EntTypeID = "0dda";

  constructor(
    public data: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
    },
  ) {
    super();
  }

  static override jsonParse(jsonString: string): EntBlogSubscriber {
    return new EntBlogSubscriber(JSON.parse(jsonString));
  }
}
