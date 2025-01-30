import { useState } from "react";
import { getLink } from "./getLink";
import ViewAnswer from "./ViewAnswer";
import CopyOnClick from "./CopyOnClick";

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

  if (props.answers.length === 0) {
    const answerLink = getLink.toAnswerJohari(props.johariID);
    return (
      <div>
        <p className="py-8 text-4xl font-thin italic">No answers yet</p>

        <div className="p-6 border border-zinc-200 rounded-lg">
          <p className="pb-4 font-light">
            Copy or Share the link and get your family, friends, colleagues,
            etc... to answer for you!
          </p>
          <div className="flex flex-row justify-between gap-8">
            <CopyOnClick textToCopy={answerLink}>
              <button className="px-4 py-2 w-full border border-zinc-200 rounded-lg">
                Copy link
              </button>
            </CopyOnClick>
            <button
              className="px-4 py-2 w-full border border-zinc-200 rounded-lg"
              onClick={() =>
                navigator.share({
                  title: `Johari Window for ${props.ownerName}`,
                  text: `Help ${props.ownerName} better understand their personality!`,
                  url: answerLink,
                })
              }
            >
              Share link
            </button>
          </div>
        </div>
      </div>
    );
  }

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
              value={answer.data.id}
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
