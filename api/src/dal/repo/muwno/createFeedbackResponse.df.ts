import { apiDB } from "../../kysely/index.js";
import { injectID, OptionalID } from "../injectID.js";
import type { CreateMuwnoPmfSurveyResponse } from "../../kysely/index.js";

export async function createFeedbackResponse(
  pmfSurveyResponse: OptionalID<CreateMuwnoPmfSurveyResponse>,
) {
  return apiDB
    .insertInto("muwno_pmf_survey_response")
    .values(injectID(pmfSurveyResponse))
    .returning("id")
    .executeTakeFirstOrThrow();
}
