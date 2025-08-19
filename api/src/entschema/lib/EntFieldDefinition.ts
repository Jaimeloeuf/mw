export type EntFieldDefinition = {
  field: string;
  storageKey: string;
  type: "string" | "number" | "boolean";
  description?: string;
};
