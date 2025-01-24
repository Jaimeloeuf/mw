import { useJohariOptions } from "./useJohariOptions";

/**
 * Component that renders all words and highlight answer words
 */
export default function (props: { words: string }) {
  const johariOptions = useJohariOptions(props.words);

  return (
    <div className="flex flex-row flex-wrap gap-6">
      {Object.entries(johariOptions).map(([johariOption, isSelected]) => (
        <p
          key={johariOption}
          className={
            "px-4 border rounded-lg " +
            (isSelected
              ? "font-light text-green-600 border-green-500"
              : "font-extralight border-gray-300")
          }
        >
          {johariOption}
        </p>
      ))}
    </div>
  );
}
