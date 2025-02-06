import { useState } from "react";
import ViewAnswer from "./ViewAnswer";

/**
 * View individual answer selections from other people
 */
export default function (props: {
  johariID: string;
  ownerName: string;
  answers: Array<{
    data: {
      id: string;
      name: string;
      words: string;
    };
  }>;
}) {
  const [selectedAnswerer, setSelectedAnswerer] = useState(
    props.answers[0]?.data?.id,
  );

  const selectedAnswerWords = props.answers.find(
    (answer) => answer.data.id === selectedAnswerer,
  )?.data?.words;

  return (
    <div>
      <p className="pb-2 text-lg">
        All {props.answers.length} answers from others
      </p>
      <div className="flex flex-col gap-1 pb-6">
        {props.answers.map((answer) => (
          <p className="text-sm">
            <span className="font-medium">{answer.data.name}</span> thinks that
            you are <i>{answer.data.words.split(",").join(", ")}</i>
          </p>
        ))}
      </div>

      <p className="pb-6 text-lg">
        See
        <select
          title="answerer"
          className="mx-2 rounded-lg border border-gray-300 px-2 font-extralight outline-none"
          value={selectedAnswerer}
          onChange={(e) => setSelectedAnswerer(e.target.value)}
        >
          {props.answers.map((answer) => (
            <option key={answer.data.id} value={answer.data.id}>
              {answer.data.name !== ""
                ? `${answer.data.name}'s`
                : "<anonymous user>"}
            </option>
          ))}
        </select>
        answer
      </p>
      {selectedAnswerWords !== undefined && (
        <ViewAnswer words={selectedAnswerWords} />
      )}
    </div>
  );
}
