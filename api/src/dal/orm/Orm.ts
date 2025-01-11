import {
  UnimplementedException,
  NotFoundException,
} from "../../exceptions/index.js";

type EntManagedData = {
  /**
   * ID generated by the framework.
   */
  id: string;

  /**
   * Timestamp managed by the framework.
   */
  createdAt: Date;

  /**
   * Timestamp managed by the framework.
   */
  updatedAt: Date;
};

/**
 * All data stored in Ent must extend this type.
 */
type EntSupportedData = Record<string, unknown>;

/**
 * Base abstract Entity class for all Ents to extend/implement
 */
export abstract class BaseEnt<
  DataType extends EntSupportedData = EntSupportedData,
> {
  /**
   * ID to uniquely identify every Ent Type, and will be used as all the Ent
   * instance's ID prefix.
   *
   * 4 character alphanumeric [a-z, 0-9] string for ~1.5 million unique IDs.
   *
   * This will allow us to quickly identify what is the Ent Type by looking at
   * the Ent instance ID.
   */
  static EntTypeID: string;

  /**
   * The Ent's data
   */
  abstract data: EntManagedData & DataType;

  get id(): string {
    return this.data.id;
  }

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
 * This are Operators for Ent users to do basic CRUD + Upsert actions for a
 * given Ent type.
 */
export interface EntCrudOperator<Ent extends BaseEnt> {
  /**
   * Create a new Ent and save it to storage layer before getting it back.
   *
   * Note that the fields in `EntManagedData`, i.e. `id`, `createdAt`, etc ...
   * are auto generated by the framework and not controlled by the user.
   */
  create(data: Omit<Ent["data"], keyof EntManagedData>): Promise<Ent>;

  /**
   * Get a single Ent from storage layer using the given ID.
   */
  get(id: string): Promise<Ent>;

  /**
   * Update a single Ent in storage layer.
   *
   * Expected workflow is where users mutate the data on the Ent, before calling
   * this `update` method with the Ent to save the changes to storage layer.
   */
  update(ent: Ent): Promise<void>;

  /**
   * Delete a single Ent from storage layer.
   */
  delete(id: string): Promise<void>;

  // @todo Upsert
}

type EntClass<Ent extends BaseEnt> = new (...args: any) => Ent;

/**
 * Operators to implement basic CRUD + Upsert feature set for a given Ent.
 */
export interface EntCrudOperatorDefinition<Ent extends BaseEnt> {
  create(ent: Ent): Promise<void>;
  get(id: string): Promise<Ent>;
  update(ent: Ent): Promise<void>;
  delete(id: string): Promise<void>;
}

export function defineEntCrudOperator<
  EntInstance extends BaseEnt,
  Ent extends EntClass<EntInstance>,
>(
  entClass: Ent,
  entCrudOperatorDefinition: EntCrudOperatorDefinition<EntInstance>,
): EntCrudOperator<EntInstance> {
  return {
    delete: entCrudOperatorDefinition.delete,

    /**
     * Verify ID before loading Ent.
     */
    get(id: string) {
      const isEntIdValid = verifyEntID(entClass, id);
      if (!isEntIdValid) {
        throw new NotFoundException(
          `Invalid ID '${id}' used for '${entClass.name}'`,
        );
      }
      return entCrudOperatorDefinition.get(id);
    },

    async create(data: Omit<EntInstance["data"], keyof EntManagedData>) {
      const now = new Date();
      const ent = new entClass({
        id: generateEntID(entClass),
        createdAt: now,
        updatedAt: now,
        ...data,
      });
      await entCrudOperatorDefinition.create(ent);
      return ent;
    },

    async update(ent: EntInstance) {
      ent.data.updatedAt = new Date();
      await entCrudOperatorDefinition.update(ent);
    },
  };
}

/**
 * Generate a new ID for a given Ent type using a UUID combined with the
 * `EntTypeID` set on the Ent class itself.
 *
 * EntTypeID is added to the end of the ID to ensure it does not cause indexing
 * issues with storage layers.
 */
function generateEntID(entClass: EntClass<BaseEnt>): string {
  // Casting to get the value of the non-abstract class
  const entTypeID = (entClass as unknown as typeof BaseEnt).EntTypeID;
  const uuid = crypto.randomUUID();
  return `${uuid}_${entTypeID}`;
}

/**
 * Verify if the Ent ID is valid for a given Ent Type / Class.
 */
function verifyEntID(entClass: EntClass<BaseEnt>, entID: string): boolean {
  const entTypeID = (entClass as unknown as typeof BaseEnt).EntTypeID;
  // By hardcoding 41, we can also ensure that the ID is of the right length,
  // and not just an arbitrary length string that happens to end with EntTypeID.
  return entID.endsWith(`_${entTypeID}`, 41);
}
