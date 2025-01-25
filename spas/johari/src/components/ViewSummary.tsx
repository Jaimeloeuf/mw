import { useJohariAnswerSummary } from "./useJohariAnswerSummary";

/**
 * Component that renders a summary of all the words answered for a Johari.
 */
export default function (props: { words: Array<string> }) {
  const johariAnswerSummary = useJohariAnswerSummary(props.words);

  return (
    <div className="flex flex-row flex-wrap gap-6">
      {Object.entries(johariAnswerSummary).map(
        ([johariWord, numberOfSelections]) => (
          <p
            key={johariWord}
            className={
              "px-4 border rounded-lg " +
              (numberOfSelections > 0
                ? "font-light text-green-600 border-green-500"
                : "font-extralight border-gray-300")
            }
          >
            {johariWord} {numberOfSelections !== 0 && `(${numberOfSelections})`}
          </p>
        )
      )}
    </div>
  );
}
