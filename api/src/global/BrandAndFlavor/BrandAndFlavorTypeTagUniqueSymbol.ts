/**
 * The globally 'unique symbol' used for the 'type tag' of `Branded` and
 * `Flavored` types.
 *
 * ## Why globally unique symbol?
 * 1. So that ALL Flavored and Brand types have the same
 * `BrandAndFlavorTypeTagUniqueSymbol` symbol so that we can do "nominal type
 * checking" to treat one Flavored/Branded type as a different type to another
 * Flavored/Branded type.
 * 1. Because when the type of `BrandAndFlavorTypeTagUniqueSymbol` is a unique
 * symbol, it cant be accessed at runtime and it wont show up in LSP
 * autocomplete suggestions.
 *
 * This `BrandAndFlavorTypeTagUniqueSymbol` tag does not exist on the resulting
 * type as a property and cannot be accessed! This will work if Brand/Flavor
 * used a `BrandAndFlavorTypeTagUniqueSymbol` string property name directly
 * instead of a unique symbol.
 * ```typescript
 * type MyObjectType = { value: boolean };
 * type FlavoredType = $MakeFlavored<MyObjectType, "myFlavor">;
 * const myObject: FlavoredType = { value: true };
 * // This dont work
 * myObject.BrandAndFlavorTypeTagUniqueSymbol;
 * ```
 *
 * ## Why is this shared by Brand/Flavor?
 * This is shared by both Brand and Flavor so that they can be converted from
 * one to the other safely!
 */
export declare const BrandAndFlavorTypeTagUniqueSymbol: unique symbol;
