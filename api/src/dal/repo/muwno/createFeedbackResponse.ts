import { apiDB } from "../../kysely/index.js";
import type { CreateMuwnoPmfSurveyResponse } from "../../kysely/index.js";

export async function createFeedbackResponse(
  pmfSurveyResponse: CreateMuwnoPmfSurveyResponse,
) {
  return apiDB
    .insertInto("muwno_pmf_survey_response")
    .values(pmfSurveyResponse)
    .returning("id")
    .executeTakeFirstOrThrow();
}
