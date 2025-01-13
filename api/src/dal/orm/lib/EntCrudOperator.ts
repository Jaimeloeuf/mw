import type { BaseEnt } from "./BaseEnt.js";
import type { EntManagedData } from "./EntManagedData.js";

/**
 * This are Operators for Ent users to do basic CRUD + Upsert actions for a
 * given Ent type.
 */
export interface EntCrudOperator<Ent extends BaseEnt> {
  /**
   * Create a new Ent and save it to storage layer before getting it back.
   *
   * Note that the fields in `EntManagedData`, i.e. `id`, `createdAt`, etc ...
   * are auto generated by the framework and not controlled by the user.
   */
  create(data: Omit<Ent["data"], keyof EntManagedData>): Promise<Ent>;

  /**
   * Get a single Ent from storage layer using the given ID.
   */
  get(id: string): Promise<Ent>;

  /**
   * Update a single Ent in storage layer.
   *
   * Expected workflow is where users mutate the data on the Ent, before calling
   * this `update` method with the Ent to save the changes to storage layer.
   */
  update(ent: Ent): Promise<void>;

  /**
   * Delete a single Ent from storage layer.
   */
  delete(id: string): Promise<void>;
}
