import { entOperators } from "../../__generated/index.js";

export default async function (johari: { name: string; words: Array<string> }) {
  const entJohari = await entOperators.EntJohariOperators.create({
    name: johari.name,
    words: johari.words.join(","),
  });

  return entJohari.id;
}
