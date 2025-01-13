import type { EntClass } from "./EntClass.js";
import type { EntCrudOperator } from "./EntCrudOperator.js";
import type { EntCrudOperatorDefinition } from "./EntCrudOperatorDefinition.js";
import type { EntManagedData } from "./EntManagedData.js";

import { NotFoundException } from "../../../exceptions/NotFoundException.js";
import { entIdGenerate } from "./entIdGenerate.js";
import { entIdVerify } from "./entIdVerify.js";

/**
 * Define Ent CRUD operators for product code to interface with an Ent type.
 */
export function defineEntCrudOperator<
  Ent extends EntClass,
  EntInstance extends Ent extends EntClass<infer EntType> ? EntType : never,
  EntCustomOperators extends { [OperatorName: string]: (...args: any) => any },
>({
  entClass,
  entCrudOperators,
  entCustomOperators,
}: {
  entClass: EntClass<EntInstance>;
  entCrudOperators: EntCrudOperatorDefinition<EntInstance>;
  entCustomOperators: EntCustomOperators;
}): EntCrudOperator<EntInstance> & EntCustomOperators {
  return {
    ...entCustomOperators,

    /**
     * Verify ID before loading Ent.
     */
    get(id: string) {
      const isEntIdValid = entIdVerify(entClass, id);
      if (!isEntIdValid) {
        throw new NotFoundException(
          `Invalid ID '${id}' used for '${entClass.name}'`,
        );
      }
      return entCrudOperators.get(id);
    },

    /**
     * Create a new Ent instance using the given Ent data and auto generated
     * ID and timestamps, which is written to storage layer before returned.
     */
    async create(data: Omit<EntInstance["data"], keyof EntManagedData>) {
      const now = new Date();
      const ent = new entClass({
        id: entIdGenerate(entClass),
        createdAt: now,
        updatedAt: now,
        ...data,
      });
      await entCrudOperators.create(ent);
      return ent;
    },

    /**
     * Update `updatedAt` timestamp before updating storage layer with operator.
     */
    async update(ent: EntInstance) {
      ent.data.updatedAt = new Date();
      await entCrudOperators.update(ent);
    },

    /**
     * Verify ID before deleting Ent.
     */
    async delete(id: string) {
      const isEntIdValid = entIdVerify(entClass, id);
      if (!isEntIdValid) {
        throw new NotFoundException(
          `Invalid ID '${id}' used for '${entClass.name}'`,
        );
      }
      await entCrudOperators.delete(id);
    },
  };
}
