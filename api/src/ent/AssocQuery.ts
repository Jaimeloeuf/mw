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

  whereFromIdIs(id: string) {
    this.query = this.query.where("from", "=", id);
    return this;
  }

  whereToIdIs(id: string) {
    this.query = this.query.where("to", "=", id);
    return this;
  }

  gen() {
    this.query.execute();
  }

  genFirst() {
    this.query.executeTakeFirstOrThrow();
  }
}
