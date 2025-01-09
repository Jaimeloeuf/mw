import { UnimplementedException } from "../../exceptions/index.js";

/**
 * Base abstract Entity class for all Ents to extend/implement
 */
export abstract class BaseEnt {
  /**
   * The Ent's data
   */
  abstract data: Record<string, unknown>;

  /**
   * Implement this to provide a consistent way for sending the data over the
   * network using JSON. This also means that all data in an Ent should use
   * primitive types that are JSON serializable.
   */
  abstract jsonSerialise(): string;

  /**
   * Recommended to use `zod` instead of parsing with `JSON.parse`.
   */
  static jsonParse(jsonString: string): unknown {
    throw new UnimplementedException(
      `jsonParse not implemented! Cannot parse: ${jsonString}`,
    );
  }
}

/**
 * Operators to implement basic CRUD + Upsert feature set for a given Ent.
 */
export interface EntCrudOperator<Ent extends BaseEnt> {
  /**
   * Override and implement this
   */
  create(ent: Ent): Promise<void>;

  /**
   * Override and implement this
   */
  get(id: string): Promise<Ent>;

  /**
   * Override and implement this
   */
  update(ent: Ent): Promise<void>;

  /**
   * Override and implement this
   */
  delete(id: string): Promise<void>;
}
