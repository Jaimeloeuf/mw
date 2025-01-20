import { EntJohariOperators } from "../../ents/EntJohari/index.js";

export default async function (johari: { name: string; words: Array<string> }) {
  const entJohari = await EntJohariOperators.create({
    name: johari.name,
    words: johari.words.join(","),
  });

  return entJohari.id;
}
