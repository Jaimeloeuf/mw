// import type { Database } from "../../dal/index.js";

import { EntEdgeDefinition } from "../lib/EntEdgeDefinition.js";
import { EntFieldDefinition } from "../lib/EntFieldDefinition.js";

export abstract class EntSchema {
  abstract EntTypeID: string;

  // @todo To implement stricter typing or perhaps do runtime validation instead
  // abstract EntDbTable: keyof Database;
  abstract EntDbTable: string;

  abstract getFields(): Array<EntFieldDefinition>;

  abstract getEdges(): Array<EntEdgeDefinition>;
}
