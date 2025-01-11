import { BaseEnt } from "../Orm.js";

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

  jsonSerialise(): string {
    return JSON.stringify(this.data);
  }

  static override jsonParse(jsonString: string): EntBlogSubscriber {
    return new EntBlogSubscriber(JSON.parse(jsonString));
  }
}
