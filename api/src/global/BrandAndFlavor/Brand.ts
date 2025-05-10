import { BrandAndFlavorTypeTagUniqueSymbol } from "./BrandAndFlavorTypeTagUniqueSymbol.js";

/**
 * Branding is a Type level concept to create "nominal types".
 *
 * Alternatively, see `Flavoring` type, it is a less strict "Branded type"
 *
 * It works by combining opaque types with primitive types (`string`, `number`)
 * to "brand" the primitive type.
 *
 * This means that
 * 1. Branded types are incompatible with each other where one branded type
 * cannot be assigned to another branded type.
 * 1. Unlike flavored types, primitives cannot be treated as the branded type
 * until it is validated and type casted, which means all values of the branded
 * type has been validated to be of that type as there cannot be implicit
 * conversions, which is why this is a "strict flavored type".
 *
 * References:
 * 1. <https://spin.atomicobject.com/typescript-flexible-nominal-typing/>
 * 1. <https://stackoverflow.com/questions/71486513/how-to-accomplish-stongly-typed-ids-in-typescript>
 */
interface Branding<Brand extends string> {
  readonly [BrandAndFlavorTypeTagUniqueSymbol]: Brand;
}

/**
 * Declaring all globally available utility types here with a $ prefix to
 * signify that these are in the global scope.
 */
declare global {
  /**
   * See the `Branding` type for details.
   */
  type $MakeBranded<TypeToBrand, Brand extends string> = TypeToBrand &
    Branding<Brand>;

  /**
   * Create strong 'branded' string, i.e. implicit string to branded type
   * conversion not allowed.
   */
  type $MakeBrandedString<Brand extends string> = $MakeBranded<string, Brand>;

  /**
   * Create strong 'branded' number, i.e. implicit number to branded type
   * conversion not allowed.
   */
  type $MakeBrandedNumber<Brand extends string> = $MakeBranded<number, Brand>;
}
