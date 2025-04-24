import { SelectQueryBuilder } from "kysely";

import type { EntClass } from "./EntClass.js";

import { Database, Assoc } from "../dal/index.js";
import { apiDB } from "../dal/kysely/apiDB.js";
import { BaseEnt } from "./BaseEnt.js";

export class AssocQuery {
  static queryWithEntType<
    Ent1 extends EntClass,
    EntInstance1 extends Ent1 extends EntClass<infer EntType> ? EntType : never,
    Ent2 extends EntClass,
    EntInstance2 extends Ent2 extends EntClass<infer EntType> ? EntType : never,
  >(entTypes: { from: EntClass<EntInstance1>; to: EntClass<EntInstance2> }) {
    const assocType = `${(entTypes.from as unknown as typeof BaseEnt).EntTypeID}-${(entTypes.to as unknown as typeof BaseEnt).EntTypeID}`;
    return new AssocQuery(assocType);
  }

  private query: SelectQueryBuilder<Database, "assoc", Assoc>;

  constructor(assocType: string) {
    this.query = apiDB
      .selectFrom("assoc")
      .selectAll()
      .where("type", "=", assocType)
      .orderBy("created_at", "desc");
  }

  whereFromIdIs(...ids: $NonEmptyArray<string>) {
    this.query =
      ids.length === 1
        ? this.query.where("from", "=", ids[0])
        : this.query.where("from", "in", ids);

    return this;
  }

  whereToIdIs(...ids: $NonEmptyArray<string>) {
    this.query =
      ids.length === 1
        ? this.query.where("to", "=", ids[0])
        : this.query.where("to", "in", ids);

    return this;
  }

  gen() {
    this.query.execute();
  }

  genFirst() {
    this.query.executeTakeFirstOrThrow();
  }
}
