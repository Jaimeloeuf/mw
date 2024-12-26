import React from "react";
import {
  urlBuilderForVersion,
  type versionController_OutputDTO,
} from "../__generated_urlBuilders/urlBuilderForVersion.generated";

export const dynamic = "force-dynamic";

export default async function Intern() {
  const version: { data: versionController_OutputDTO } = await fetch(
    urlBuilderForVersion(),
  ).then((res) => res.json());

  return (
    <div>
      <h2>Intern</h2>
      <div>Version: {version.data}</div>
    </div>
  );
}
