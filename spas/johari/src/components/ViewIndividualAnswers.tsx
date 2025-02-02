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
    props.answers[0]?.data?.id
  );

  const selectedAnswerWords = props.answers.find(
    (answer) => answer.data.id === selectedAnswerer
  )?.data?.words;

  return (
    <div>
      <p className="pb-6 text-lg">
        Received {props.answers.length} answers, see answer from
        <select
          title="Answer Owner"
          className="ml-4 px-2 outline-none border border-gray-300 rounded-lg font-extralight"
          value={selectedAnswerer}
          onChange={(e) => setSelectedAnswerer(e.target.value)}
        >
          {props.answers.map((answer) => (
            <option key={answer.data.id} value={answer.data.id}>
              {answer.data.name !== "" ? answer.data.name : "<anonymous user>"}
            </option>
          ))}
        </select>
      </p>
      {selectedAnswerWords !== undefined && (
        <ViewAnswer words={selectedAnswerWords} />
      )}
    </div>
  );
}
