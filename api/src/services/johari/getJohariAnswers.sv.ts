import { entOperators } from "../../__generated/index.js";

export default async function (johariID: string) {
  const entJohariAnwers =
    await entOperators.EntJohariAnswerOperators.getAllAnswersForJohari(
      johariID,
    );
  return entJohariAnwers;
}
