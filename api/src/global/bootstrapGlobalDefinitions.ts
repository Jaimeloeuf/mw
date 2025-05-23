/**
 * Bootstrap all global scope code definitions in this file
 */

// Import modules to run their side effects of setting values on `globalThis`
import "./utils/convertUnknownCatchToError.js";
import "./utils/awaitPromiseSafely.js";
import "./utils/runAsyncFnSafely.js";
import "./utils/runFnSafely.js";
import "./types/DateTime.js";
import "./idTypes/UUID.js";
import "./idTypes/EntID.js";
