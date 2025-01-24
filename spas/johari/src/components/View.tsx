import { useParams } from "react-router-dom";
import { useJohari } from "./useJohari";
import ViewAnswer from "./ViewAnswer";

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
      <p className="text-2xl pb-12">
        Johari Window for
        <span className="pl-2 underline underline-offset-4 font-extralight decoration-1">
          {props.name}
        </span>
      </p>

      <div>
        <p className="pb-6 text-xl">
          Individual Answers, see answer from
          <select
            title="Answer Owner"
            className="ml-4 px-2 outline-none border border-gray-300 rounded-lg font-extralight"
          >
            <option value={props.name}>{props.name}</option>
          </select>
        </p>
        <ViewAnswer {...props} />
      </div>
    </div>
  );
}
