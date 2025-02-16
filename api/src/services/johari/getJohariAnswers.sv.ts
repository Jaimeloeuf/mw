import { ents } from "../../__generated/index.js";

export default async function (johariID: string) {
  const entJohariAnwers =
    await ents.EntJohariAnswerOperators.getAllAnswersForJohari(johariID);
  return entJohariAnwers;
}
