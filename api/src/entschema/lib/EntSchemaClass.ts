import { EntSchema } from "./EntSchema.js";

export type EntSchemaClass = {
  new (...args: any[]): EntSchema;
};
