import { useState } from "react";
import ViewAnswer from "./ViewAnswer";

/**
 * View individual answer selections from other people
 */
export default function (props: {
  answers: Array<{
    data: {
      name: string;
      words: string;
    };
  }>;
}) {
  const [selectedAnswerer, setSelectedAnswerer] = useState(
    props.answers[0]?.data?.name
  );

  // @todo This will break if there are 2 or more ppl who use the same name
  const selectedAnswerWords = props.answers.find(
    (answer) => answer.data.name === selectedAnswerer
  )?.data?.words;

  return (
    <div>
      <p className="pb-6 text-xl">
        Received {props.answers.length} answers, see answer from
        <select
          title="Answer Owner"
          className="ml-4 px-2 outline-none border border-gray-300 rounded-lg font-extralight"
          value={selectedAnswerer}
          onChange={(e) => setSelectedAnswerer(e.target.value)}
        >
          {props.answers.map((answer) => (
            <option
              // Key is a combo to ensure that duplicate names dont cause issues
              key={answer.data.name + answer.data.words}
              value={answer.data.name}
            >
              {answer.data.name}
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
