import { SelectQueryBuilder } from "kysely";

import type { EntClass } from "./EntClass.js";

import { Database, Assoc } from "../dal/index.js";
import { apiDB } from "../dal/kysely/apiDB.js";
import { NotFoundException } from "../exceptions/NotFoundException.js";
import { BaseEnt } from "./BaseEnt.js";
import { entIdVerify } from "./entIdVerify.js";

export class AssocQuery {
  static queryWithEntType<
    Ent1 extends EntClass,
    EntInstance1 extends Ent1 extends EntClass<infer EntType> ? EntType : never,
    Ent2 extends EntClass,
    EntInstance2 extends Ent2 extends EntClass<infer EntType> ? EntType : never,
  >(entTypes: { from: EntClass<EntInstance1>; to: EntClass<EntInstance2> }) {
    const assocType = `${(entTypes.from as unknown as typeof BaseEnt).EntTypeID}-${(entTypes.to as unknown as typeof BaseEnt).EntTypeID}`;
    return new AssocQuery(
      assocType,
      entTypes.from as unknown as typeof BaseEnt,
      entTypes.to as unknown as typeof BaseEnt,
    );
  }

  private query: SelectQueryBuilder<Database, "assoc", Assoc>;

  constructor(
    assocType: string,
    private readonly fromEntType: typeof BaseEnt,
    private readonly toEntType: typeof BaseEnt,
  ) {
    this.query = apiDB
      .selectFrom("assoc")
      .selectAll()
      .where("type", "=", assocType)
      .orderBy("created_at", "desc");
  }

  /**
   * Any invalid id will cause the method to throw.
   */
  whereFromIdIs(...ids: $NonEmptyArray<string>) {
    for (const id of ids) {
      const isEntIdValid = entIdVerify(this.fromEntType, id);
      if (!isEntIdValid) {
        throw new NotFoundException(
          `Invalid ID '${id}' used for '${this.fromEntType.name}'`,
        );
      }
    }

    this.query =
      ids.length === 1
        ? this.query.where("from", "=", ids[0])
        : this.query.where("from", "in", ids);

    return this;
  }

  /**
   * Any invalid id will cause the method to throw.
   */
  whereToIdIs(...ids: $NonEmptyArray<string>) {
    for (const id of ids) {
      const isEntIdValid = entIdVerify(this.toEntType, id);
      if (!isEntIdValid) {
        throw new NotFoundException(
          `Invalid ID '${id}' used for '${this.toEntType.name}'`,
        );
      }
    }

    this.query =
      ids.length === 1
        ? this.query.where("to", "=", ids[0])
        : this.query.where("to", "in", ids);

    return this;
  }

  gen() {
    return this.query.execute();
  }

  genFirst() {
    return this.query.executeTakeFirstOrThrow();
  }
}
