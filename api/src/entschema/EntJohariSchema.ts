import { EntEdgeDefinition } from "./lib/EntEdgeDefinition.js";
import { EntFieldDefinition } from "./lib/EntFieldDefinition.js";
import { EntSchema } from "./lib/EntSchema.js";

export class EntJohariSchema implements EntSchema {
  EntTypeID = "4f51";

  getFields(): Array<EntFieldDefinition> {
    return [
      {
        field: "name",
        type: "string",
        description: "Name of the user this Johari belongs to",
      },
      {
        field: "words",
        type: "string",
        description: "Words that the user selected for themselves",
      },
      {
        field: "creatorID",
        type: "string",
      },
    ];
  }

  getEdges(): Array<EntEdgeDefinition> {
    return [
      {
        name: "creator",
        type: "field-edge",
        idField: "creatorID",
      },
    ];
  }
}
