import { ents } from "../../__generated/index.js";

export default async function (johariID: string) {
  const entJohari = await ents.EntJohariOperators.get(johariID);
  return entJohari.data;
}
