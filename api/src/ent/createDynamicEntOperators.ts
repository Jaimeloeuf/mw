import type { EntSchema } from "../entschema/lib/index.js";
import type { EntClass } from "./EntClass.js";
import type { EntCrudOperator } from "./EntCrudOperator.js";
import type { EntManagedData } from "./EntManagedData.js";

import { apiDB } from "../dal/kysely/index.js";

export function createDynamicEntOperators<
  Ent extends EntClass,
  EntInstance extends Ent extends EntClass<infer EntType> ? EntType : never,
>(EntSchemaClass: typeof EntSchema): EntCrudOperator<EntInstance> {
  const {
    entClass,
    entSchemaDbTable,
    mapObjectToEntWithStorageKeys,
    mapEntToObjectWithStorageKeys,
  } = EntSchemaClass.validateAndSetup();

  return {
    /**
     * Verify ID before loading Ent.
     */
    async get(id: string) {
      $EntID.makeStrongAndThrowOnError(id, entClass);

      const data = await apiDB
        .selectFrom(entSchemaDbTable)
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirstOrThrow();

      // @todo Remove casting
      return new entClass(mapObjectToEntWithStorageKeys(data)) as EntInstance;
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

      const dbRows = await apiDB
        .selectFrom(entSchemaDbTable)
        .selectAll()
        .where("id", "in", ids)
        .execute();

      const ents = new Array(dbRows.length);
      for (let i = 0; i < dbRows.length; i++) {
        ents[i] = new entClass(mapObjectToEntWithStorageKeys(dbRows[i]!));
      }

      return ents;
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

      await apiDB
        .insertInto(entSchemaDbTable)
        .values(mapEntToObjectWithStorageKeys(ent))
        .returningAll()
        .executeTakeFirstOrThrow();

      // @todo Remove casting
      return ent as EntInstance;
    },

    /**
     * Update `updatedAt` timestamp before updating storage layer with operator.
     */
    async update(ent: EntInstance) {
      ent.data.updatedAt = $DateTime.now.asIsoDateTime();

      await apiDB
        .updateTable(entSchemaDbTable)
        .where("id", "=", ent.data.id)
        // @todo Not very efficient as we are writing the whole object here
        .set(mapEntToObjectWithStorageKeys(ent))
        .execute();
    },

    /**
     * Verify ID before deleting Ent.
     */
    async delete(id: string) {
      $EntID.makeStrongAndThrowOnError(id, entClass);

      await apiDB
        .deleteFrom(entSchemaDbTable)
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirst();
    },
  };
}

async function test() {
}
test();
