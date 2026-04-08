export type EntFieldDefinition = {
  field: string;
  storageKey: string;
  type: "ID" | "string" | "number" | "boolean";
  description?: string;
  /**
   * Optional Ent/Object class type that this links to
   */
  classs?: any;
};
