import { apiDB } from "../../kysely/index.js";
import type { MuwnoPmfSurveyResponse } from "../../kysely/index.js";
import { NotFoundException } from "../../../exceptions/index.js";

export async function getTasksOfResponse(
  responseID: MuwnoPmfSurveyResponse["id"],
) {
  return apiDB
    .selectFrom("muwno_task")
    .selectAll()
    .where("pmf_survey_response_id", "=", responseID)
    .execute();
}
