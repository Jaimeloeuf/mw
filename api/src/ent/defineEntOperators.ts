import type { EntClass } from "./EntClass.js";
import type { EntCrudOperator } from "./EntCrudOperator.js";
import type { EntCrudOperatorStorageAdapter } from "./EntCrudOperatorStorageAdapter.js";
import type { EntManagedData } from "./EntManagedData.js";

import { NotFoundException } from "../exceptions/NotFoundException.js";

/**
 * Define Ent operators for product code to interface with an Ent type.
 */
export function defineEntOperators<
  Ent extends EntClass,
  EntInstance extends Ent extends EntClass<infer EntType> ? EntType : never,
  EntCustomOperators extends { [OperatorName: string]: (...args: any) => any },
>(
  entClass: EntClass<EntInstance>,
  operators: {
    CRUD: EntCrudOperatorStorageAdapter<EntInstance>;
    custom: EntCustomOperators;
  },
): EntCrudOperator<EntInstance> & EntCustomOperators {
  return {
    ...operators.custom,

    /**
     * Verify ID before loading Ent.
     */
    get(id: string) {
      const isEntIdValid = $EntID.isValid(entClass, id);
      if (!isEntIdValid) {
        throw new NotFoundException(
          `Invalid ID '${id}' used for '${entClass.name}'`,
        );
      }
      return operators.CRUD.get(id);
    },

    /**
     * Verify IDs before loading Ents.
     *
     * This will throw if even a single ID is invalid!
     */
    getMany(ids: $NonEmptyArray<string>) {
      for (const id of ids) {
        const isEntIdValid = $EntID.isValid(entClass, id);
        if (!isEntIdValid) {
          throw new NotFoundException(
            `Invalid ID '${id}' used for '${entClass.name}'`,
          );
        }
      }
      return operators.CRUD.getMany(ids);
    },

    /**
     * Create a new Ent instance using the given Ent data and auto generated
     * ID and timestamps, which is written to storage layer before returned.
     */
    async create(data: Omit<EntInstance["data"], keyof EntManagedData>) {
      const now = new Date();
      const ent = new entClass({
        id: $EntID.generate(entClass),
        createdAt: now,
        updatedAt: now,
        ...data,
      });
      await operators.CRUD.create(ent);
      return ent;
    },

    /**
     * Update `updatedAt` timestamp before updating storage layer with operator.
     */
    async update(ent: EntInstance) {
      ent.data.updatedAt = new Date();
      await operators.CRUD.update(ent);
    },

    /**
     * Verify ID before deleting Ent.
     */
    async delete(id: string) {
      const isEntIdValid = $EntID.isValid(entClass, id);
      if (!isEntIdValid) {
        throw new NotFoundException(
          `Invalid ID '${id}' used for '${entClass.name}'`,
        );
      }
      await operators.CRUD.delete(id);
    },
  };
}
