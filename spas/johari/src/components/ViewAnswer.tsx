import { useJohariOptions } from "./useJohariOptions";

/**
 * Component that renders all words and highlight answer words
 */
export default function (props: { words: string }) {
  const johariOptions = useJohariOptions(props.words);

  return (
    <div className="flex flex-row flex-wrap gap-4">
      {Object.entries(johariOptions).map(([johariOption, isSelected]) => (
        <p
          key={johariOption}
          className={
            "rounded-lg border px-4 " +
            (isSelected
              ? "border-green-500 font-light text-green-600"
              : "border-gray-300 font-extralight")
          }
        >
          {johariOption}
        </p>
      ))}
    </div>
  );
}
