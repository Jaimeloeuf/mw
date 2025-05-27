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

export class AssocQuery<FromEnt extends EntClass, ToEnt extends EntClass> {
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

  #whereFromIdIsCalled: boolean = false;

  /**
   * ## Notes
   * 1. Any invalid id will cause the method to throw.
   * 1. Duplicate IDs will be treated as a single ID and only return 1 result.
   */
  whereFromIdIs(...ids: $NonEmptyArray<string>) {
    if (this.#whereFromIdIsCalled) {
      throw new Error(
        `${AssocQuery}.${this.whereFromIdIs.name}: Can only be called once`,
      );
    }

    for (const id of ids) {
      const isEntIdValid = $EntID.isValid(this.fromEntType, id);
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

  #whereToIdIsCalled: boolean = false;

  /**
   * ## Notes
   * 1. Any invalid id will cause the method to throw.
   * 1. Duplicate IDs will be treated as a single ID and only return 1 result.
   */
  whereToIdIs(...ids: $NonEmptyArray<string>) {
    if (this.#whereToIdIsCalled) {
      throw new Error(
        `${AssocQuery}.${this.whereToIdIs.name}: Can only be called once`,
      );
    }

    for (const id of ids) {
      const isEntIdValid = $EntID.isValid(this.toEntType, id);
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
   * Generate actual Ent nodes from raw Assoc values using the dynamically
   * loaded EntOperator's `getMany` method.
   */
  async #genNodes<
    NodeType extends "to" | "from",
    FromEntInstance extends FromEnt extends EntClass<infer EntType>
      ? EntType
      : never,
    ToEntInstance extends ToEnt extends EntClass<infer EntType>
      ? EntType
      : never,
    ReturnType extends NodeType extends "to" ? ToEntInstance : FromEntInstance,
  >(entTypeID: string, nodeType: NodeType) {
    const assocs = await this.genRawAssoc();

    if (assocs.length === 0) {
      return [];
    }

    const entOperator = entOperatorsMapping[entTypeID];

    if (entOperator === undefined) {
      throw new InvalidInternalStateException(
        `Cannot find EntOperator for EntTypeID: ${entTypeID}`,
      );
    }

    // Casting allowed as already verified that there is at least one Assoc
    const ids = assocs.map(
      (assoc) => assoc[nodeType],
    ) as $NonEmptyArray<string>;

    return (await entOperator.getMany(ids)) as Array<ReturnType>;
  }

  /**
   * Generate the actual Ent nodes instead of raw Assoc values.
   */
  async genNodes() {
    return this.#genNodes(
      (this.toEntType as unknown as typeof BaseEnt).EntTypeID,
      "to",
    );
  }

  /**
   * Generate the actual Ent nodes instead of raw Assoc values.
   */
  async genInverseNodes() {
    return this.#genNodes(
      (this.fromEntType as unknown as typeof BaseEnt).EntTypeID,
      "from",
    );
  }
}
