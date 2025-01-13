import type { BaseEnt } from "./BaseEnt.js";

/**
 * Storage layer (DB) adapters for an Ent's CRUD operators.
 */
export interface EntCrudOperatorStorageAdapter<Ent extends BaseEnt> {
  create(ent: Ent): Promise<void>;
  get(id: string): Promise<Ent>;
  update(ent: Ent): Promise<void>;
  delete(id: string): Promise<void>;
}
