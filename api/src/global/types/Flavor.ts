import { BrandAndFlavorTypeTagUniqueSymbol } from "./BrandAndFlavorTypeTagUniqueSymbol.js";

/**
 * Flavoring is a Type level concept to create "nominal types".
 *
 * Alternatively, see `Branding` type, it is a stricter "Flavored type"
 *
 * It works by combining opaque types with primitive types (`string`, `number`)
 * to "flavor" the primitive type.
 *
 * This means that
 * 1. Flavored types are incompatible with each other where one flavored type
 * cannot be assigned to another flavored type.
 * 1. Unlike branded types, flavored types allow implicit conversions of primitive
 * type to flavored type without any validation or type casting, which means
 * all primitive type can be treated as the flavored type easily, which is why
 * this is a "weak branded type".
 *
 * References:
 * 1. <https://spin.atomicobject.com/typescript-flexible-nominal-typing/>
 * 1. <https://stackoverflow.com/questions/71486513/how-to-accomplish-stongly-typed-ids-in-typescript>
 */
interface Flavoring<Flavor extends string> {
  readonly [BrandAndFlavorTypeTagUniqueSymbol]?: Flavor;
}

/**
 * Declaring all globally available utility types here with a $ prefix to
 * signify that these are in the global scope.
 */
declare global {
  /**
   * See the `Flavoring` type for details.
   */
  type $MakeFlavored<TypeToFlavor, Flavor extends string> = TypeToFlavor &
    Flavoring<Flavor>;
}
