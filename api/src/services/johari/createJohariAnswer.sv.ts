import { ents } from "../../__generated/index.js";

export default async function (johari: {
  johariID: string;
  name: string;
  words: Array<string>;
}) {
  const entJohariAnswer = await ents.EntJohariAnswerOperators.create({
    johariID: johari.johariID,
    name: johari.name,
    words: johari.words.join(","),
  });

  return entJohariAnswer.id;
}
