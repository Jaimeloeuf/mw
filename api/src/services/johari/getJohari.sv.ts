import { entOperators } from "../../__generated/index.js";

export default async function (johariID: string) {
  const entJohari = await entOperators.EntJohariOperators.get(johariID);
  return entJohari.data;
}
