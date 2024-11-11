import type { CreateMuwnoPmfSurveyResponse } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";
import { injectID, OptionalID } from "../injectID.js";

/**
 * Save a feedback form response.
 */
export default dataFn(function muwnoCreateFeedbackResponse(
  pmfSurveyResponse: OptionalID<CreateMuwnoPmfSurveyResponse>,
) {
  return apiDB
    .insertInto("muwno_pmf_survey_response")
    .values(injectID(pmfSurveyResponse))
    .returning("id")
    .executeTakeFirstOrThrow();
});
