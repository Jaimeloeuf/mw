/**
 * ********************* THIS IS A GENERATED FILE *****************************
 * ********************* DO NOT MODIFY OR FORMAT MANUALLY *********************
 *
 * This file is automatically generated with the module:
 * genEntMapping
 *
 * Generated hash in hex for code after this section is:
 * sha256(f30503b05639d57d5106c9b67811cb3722f66d51ec1df8e3f4f076c5df213d0e)
 */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable perfectionist/sort-exports */
import type { BaseEnt } from "../ent/BaseEnt.js";

import { ents } from "./entsBarrelFile.generated.js";

/**
 * Mapping of `EntTypeID` to `Ent`.
 */
export const entMapping: Record<
  string,
  new (..._constructorArgs: any) => BaseEnt<any>
> = {
  "40ba": ents.EntBlog,
  "0dda": ents.EntBlogSubscriber,
  "4f51": ents.EntJohari,
  "90f3": ents.EntJohariAnswer,
};
