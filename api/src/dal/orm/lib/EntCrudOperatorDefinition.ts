import type { BaseEnt } from "./BaseEnt.js";

/**
 * Operators to implement basic CRUD + Upsert feature set for a given Ent.
 */
export interface EntCrudOperatorDefinition<Ent extends BaseEnt> {
  create(ent: Ent): Promise<void>;
  get(id: string): Promise<Ent>;
  update(ent: Ent): Promise<void>;
  delete(id: string): Promise<void>;
}
