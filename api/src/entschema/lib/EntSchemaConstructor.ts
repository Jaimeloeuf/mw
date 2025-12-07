import { EntSchema } from "./EntSchema.js";

export type EntSchemaConstructor<T extends EntSchema> = new (
  ...args: Array<any>
) => T;
