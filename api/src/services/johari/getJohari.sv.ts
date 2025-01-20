import { EntJohariOperators } from "../../ents/EntJohari/index.js";

export default async function (johariID: string) {
  const entJohari = await EntJohariOperators.get(johariID);
  return entJohari.data;
}
