import { EntEdgeDefinition } from "../lib/EntEdgeDefinition.js";
import { EntFieldDefinition } from "../lib/EntFieldDefinition.js";

export abstract class EntSchema {
  abstract EntTypeID: string;

  abstract getFields(): Array<EntFieldDefinition>;

  abstract getEdges(): Array<EntEdgeDefinition>;
}
