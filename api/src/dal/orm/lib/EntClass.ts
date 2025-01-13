import type { BaseEnt } from "./BaseEnt.js";

/**
 * Utility generic type to mean "A class that extends BaseEnt" using the
 * constructor function type signature.
 */
export type EntClass<Ent extends BaseEnt = BaseEnt> = new (...args: any) => Ent;
