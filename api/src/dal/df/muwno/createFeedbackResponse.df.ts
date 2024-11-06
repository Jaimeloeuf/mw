import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import { injectID, OptionalID } from "../injectID.js";
import type { CreateMuwnoPmfSurveyResponse } from "../../kysely/index.js";

/**
 * Save a feedback form response.
 */
export default dataFn(function createFeedbackResponse(
  pmfSurveyResponse: OptionalID<CreateMuwnoPmfSurveyResponse>,
) {
  return apiDB
    .insertInto("muwno_pmf_survey_response")
    .values(injectID(pmfSurveyResponse))
    .returning("id")
    .executeTakeFirstOrThrow();
});
