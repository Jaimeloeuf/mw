import { apiDB } from "../../kysely/index.js";
import type { MuwnoPmfSurveyResponse } from "../../kysely/index.js";
import { NotFoundException } from "../../../exceptions/index.js";

export async function getProductIdOfFeedbackResponse(
  feedbackResponseID: MuwnoPmfSurveyResponse["id"],
) {
  const feedbackResponse = await apiDB
    .selectFrom("muwno_pmf_survey_response")
    .select("product_id")
    .where("id", "=", feedbackResponseID)
    .executeTakeFirst();

  if (feedbackResponse === undefined) {
    throw new NotFoundException(
      `Cannot find feedback response: ${feedbackResponseID}`,
    );
  }

  return feedbackResponse.product_id;
}
