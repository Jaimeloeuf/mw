import { EntSchema } from "./EntSchema.js";

export type EntSchemaConstructor<T extends EntSchema> = new (
  ...args: any[]
) => T;
