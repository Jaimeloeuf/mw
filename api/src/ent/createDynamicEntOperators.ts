import type { EntClass } from "./EntClass.js";
import type { EntCrudOperator } from "./EntCrudOperator.js";
import type { EntManagedData } from "./EntManagedData.js";

import { EntBlog } from "../ents/EntBlog/EntBlog.js";

export function createDynamicEntOperators<
  Ent extends EntClass,
  EntInstance extends Ent extends EntClass<infer EntType> ? EntType : never,
>(
  entClass: EntClass<EntInstance>,
): EntCrudOperator<EntInstance> {
  return <any>{
    /**
     * Verify ID before loading Ent.
     */
    async get(id: string) {
      $EntID.makeStrongAndThrowOnError(id, entClass);
    },

    /**
     * Verify IDs before loading Ents.
     *
     * This will throw if even a single ID is invalid!
     */
    async getMany(ids: $NonEmptyArray<string>) {
      for (const id of ids) {
        $EntID.makeStrongAndThrowOnError(id, entClass);
      }
    },

    /**
     * Create a new Ent instance using the given Ent data and auto generated
     * ID and timestamps, which is written to storage layer before returned.
     */
    async create(data: Omit<EntInstance["data"], keyof EntManagedData>) {
      const now = $DateTime.now.asIsoDateTime();

      const ent = new entClass({
        id: $EntID.generate(entClass),
        createdAt: now,
        updatedAt: now,
        ...data,
      });

      return ent;
    },

    /**
     * Update `updatedAt` timestamp before updating storage layer with operator.
     */
    async update(ent: EntInstance) {
      ent.data.updatedAt = $DateTime.now.asIsoDateTime();
    },

    /**
     * Verify ID before deleting Ent.
     */
    async delete(id: string) {
      $EntID.makeStrongAndThrowOnError(id, entClass);
    },
  };
}

async function test() {
}
test();
