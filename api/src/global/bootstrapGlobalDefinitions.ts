/**
 * Bootstrap all global scope code definitions in this file
 */

// Import modules to run their side effects of setting values on `globalThis`
import "./utils/convertUnknownCatchToError.js";
import "./utils/awaitPromiseSafely.js";
import "./idTypes/UUID.js";
import "./idTypes/EntID.js";
