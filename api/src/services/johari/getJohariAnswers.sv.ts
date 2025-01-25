import { EntJohariAnswerOperators } from "../../ents/EntJohariAnswer/index.js";

export default async function (johariID: string) {
  const entJohariAnwers =
    await EntJohariAnswerOperators.getAllAnswersForJohari(johariID);
  return entJohariAnwers;
}
