/* eslint-disable */

import "../global/bootstrapGlobalDefinitions.js";

// Import these after global import which runs global side effects
import { config } from "../config/index.js";

/**
 * `npm run scratchpad`
 *
 * Use this to quickly test out ideas like a personal scratch pad, but do not
 * commit any changes to this into source control.
 */
async function scratchpad() {
  console.log("config.env()", config.env());
}

scratchpad();
