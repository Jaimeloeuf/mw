import { useJohariAnswerSummary } from "./useJohariAnswerSummary";

/**
 * Component that renders a summary of all the words answered for a Johari.
 */
export default function (props: { words: Array<string> }) {
  const johariAnswerSummary = useJohariAnswerSummary(props.words);

  return (
    <div className="flex flex-row flex-wrap gap-4">
      {Object.entries(johariAnswerSummary).map(
        ([johariWord, numberOfSelections]) => (
          <p
            key={johariWord}
            className={
              "rounded-lg border px-4 " +
              (numberOfSelections > 0
                ? "border-green-500 font-light text-green-600"
                : "border-gray-300 font-extralight")
            }
          >
            {johariWord} {numberOfSelections !== 0 && `(${numberOfSelections})`}
          </p>
        ),
      )}
    </div>
  );
}
