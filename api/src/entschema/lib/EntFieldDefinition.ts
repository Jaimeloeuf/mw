export type EntFieldDefinition = {
  field: string;
  storageKey: string;
  type: "ID" | "string" | "number" | "boolean";
  description?: string;
};
