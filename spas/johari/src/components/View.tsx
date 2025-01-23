import { useParams } from "react-router-dom";
import { useJohari } from "./useJohari";

export default function JohariLoader() {
  const { johariID } = useParams();

  if (johariID === undefined) {
    throw new Error("Invalid JohariID");
  }

  const { status, isError, error, data } = useJohari(johariID);

  if (status === "pending") {
    return (
      <p className="py-8 text-2xl font-thin text-center">... loading ...</p>
    );
  }

  if (isError) {
    return (
      <div className="py-8">
        <p className="pb-2 text-2xl">Failed to load Johari</p>
        <p className="text-xl font-thin">{error.toString()}</p>
      </div>
    );
  }

  return <JohariView name={data.data.name} words={data.data.words} />;
}

function JohariView(props: { words: string; name: string }) {
  return (
    <div>
      <p className="text-2xl pb-6">
        Johari Window for
        <span className="pl-2 underline underline-offset-4 font-extralight decoration-1">
          {props.name}
        </span>
      </p>
    </div>
  );
}
