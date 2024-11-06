import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { MuwnoPmfSurveyResponse } from "../../kysely/index.js";

export default dataFn(function getTasksOfResponse(
  responseID: MuwnoPmfSurveyResponse["id"],
) {
  return apiDB
    .selectFrom("muwno_task")
    .selectAll()
    .where("pmf_survey_response_id", "=", responseID)
    .execute();
});