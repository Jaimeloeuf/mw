import { SelectQueryBuilder } from "kysely";

import type { EntClass } from "./EntClass.js";

import { entOperatorsMapping } from "../__generated/index.js";
import { Database, Assoc } from "../dal/index.js";
import { apiDB } from "../dal/kysely/apiDB.js";
import {
  InvalidInternalStateException,
  NotFoundException,
} from "../exceptions/index.js";
import { BaseEnt } from "./BaseEnt.js";
import { entIdVerify } from "./entIdVerify.js";

export class AssocQuery<
  FromEnt extends EntClass,
  FromEntInstance extends FromEnt extends EntClass<infer EntType>
    ? EntType
    : never,
  ToEnt extends EntClass,
  ToEntInstance extends ToEnt extends EntClass<infer EntType> ? EntType : never,
> {
  private query: SelectQueryBuilder<Database, "assoc", Assoc>;

  constructor(
    private readonly fromEntType: FromEnt,
    private readonly toEntType: ToEnt,
  ) {
    const assocType = `${(fromEntType as unknown as typeof BaseEnt).EntTypeID}-${(toEntType as unknown as typeof BaseEnt).EntTypeID}`;

    this.query = apiDB
      .selectFrom("assoc")
      .selectAll()
      .where("type", "=", assocType)
      .orderBy("created_at", "desc");
  }

  /**
   * ## Notes
   * 1. Any invalid id will cause the method to throw.
   * 1. Duplicate IDs will be treated as a single ID and only return 1 result.
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
   * ## Notes
   * 1. Any invalid id will cause the method to throw.
   * 1. Duplicate IDs will be treated as a single ID and only return 1 result.
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

  /**
   * Generate raw Assoc edge. Generally unused unless you want to get the raw
   * Assoc edge back yourself to do further processing or just need the raw IDs
   */
  genRawAssoc() {
    return this.query.execute();
  }

  /**
   * Generate raw Assoc edge. Generally unused unless you want to get the raw
   * Assoc edge back yourself to do further processing or just need the raw IDs
   */
  genFirstRawAssoc() {
    return this.query.executeTakeFirstOrThrow();
  }

  /**
   * Generate the actual Ent nodes instead of raw Assoc values.
   */
  async genNodes() {
    const assocs = await this.genRawAssoc();

    if (assocs.length === 0) {
      return [];
    }

    const entOperator =
      entOperatorsMapping[
        (this.toEntType as unknown as typeof BaseEnt).EntTypeID
      ];

    if (entOperator === undefined) {
      throw new InvalidInternalStateException(
        `Cannot find EntOperator for EntTypeID: ${(this.toEntType as unknown as typeof BaseEnt).EntTypeID}`,
      );
    }

    // Casting allowed as already verified that there is at least one Assoc
    const toIds = assocs.map((assoc) => assoc.to) as $NonEmptyArray<string>;

    return (await entOperator.getMany(toIds)) as Array<ToEntInstance>;
  }
}
