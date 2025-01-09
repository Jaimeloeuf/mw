import { BaseEnt } from "./Orm.js";

export class BlogSubscriber extends BaseEnt {
  constructor(
    public data: {
      id: string;
      createdAt: Date;
      email: string;
    },
  ) {
    super();
  }

  jsonSerialise(): string {
    return JSON.stringify(this.data);
  }

  static override jsonParse(jsonString: string): BlogSubscriber {
    return new BlogSubscriber(JSON.parse(jsonString));
  }
}
