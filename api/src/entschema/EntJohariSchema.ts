import { EntEdgeDefinition } from "./lib/EntEdgeDefinition.js";
import { EntFieldDefinition } from "./lib/EntFieldDefinition.js";
import { EntSchema } from "./lib/EntSchema.js";

export class EntJohariSchema extends EntSchema {
  EntTypeID = "4f51";

  EntDbTable = "johari";

  getFieldConfigs(): Array<EntFieldDefinition> {
    return [
      {
        field: "name",
        storageKey: "name",
        type: "string",
        description: "Name of the user this Johari belongs to",
      },
      {
        field: "words",
        storageKey: "words",
        type: "string",
        description: "Words that the user selected for themselves",
      },
      {
        field: "creatorID",
        storageKey: "creatorID",
        type: "string",
      },
    ];
  }

  getEdgeConfigs(): Array<EntEdgeDefinition> {
    return [
      {
        name: "creator",
        type: "field-edge",
        idField: "creatorID",
      },
    ];
  }
}
