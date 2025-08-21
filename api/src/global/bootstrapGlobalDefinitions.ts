/**
 * Bootstrap all global scope code definitions in this file
 */

// Import modules to run their side effects of setting values on `globalThis`
import "nice-types/global";
import "convert-unknown-catch-to-error/global";
import "safety-number-one/global";
import "datetime-ts";

import "./idTypes/UUID.js";
import "./idTypes/EntID.js";

// Ensure only included/ran once
// *not needed for most cases, only specific edge cases might call this twice
{
  let isBootstrapped = false;
  if (isBootstrapped) {
    throw new Error(`Global definitions bootstrap ran more than once!`);
  }
  isBootstrapped = true;
}
