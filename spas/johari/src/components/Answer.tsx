import { twJoin } from "tailwind-merge";
import type { useEmptyJohariOptionsSet } from "../hooks/useEmptyJohariOptionsSet";

export default function (
  props: ReturnType<typeof useEmptyJohariOptionsSet> & { onSubmit: () => void },
) {
  const {
    johariOptions,
    setJohariOptions,
    resetJohariOptions,
    numberOfSelectedOptions,
    onSubmit,
  } = props;

  function toggleSelection(johariOption: string) {
    if (numberOfSelectedOptions > 5 && johariOptions[johariOption] !== true) {
      alert("You can only select up to 6 words");
      return;
    }

    setJohariOptions({
      ...johariOptions,
      [johariOption]: !johariOptions[johariOption],
    });
  }

  return (
    <div>
      <div className="flex flex-row items-center gap-2 pb-4">
        <p className="text-sm font-light">
          Selected {numberOfSelectedOptions}/6 words
        </p>
        <button
          className="rounded-lg border border-red-500 px-2 text-xs text-red-500"
          disabled={numberOfSelectedOptions === 0}
          onClick={resetJohariOptions}
        >
          reset
        </button>
      </div>

      <div className="flex flex-row flex-wrap gap-4">
        {Object.entries(johariOptions).map(([johariOption, isSelected]) => (
          <button
            key={johariOption}
            onClick={() => toggleSelection(johariOption)}
            className={twJoin(
              "rounded-lg border px-4",
              isSelected
                ? "border-green-500 font-light text-green-600"
                : "border-gray-300 font-extralight",
            )}
          >
            {johariOption}
          </button>
        ))}
      </div>

      <div className="pt-8">
        <button
          className={twJoin(
            "w-full rounded-lg border px-4 text-lg",
            numberOfSelectedOptions === 6
              ? "border-green-600 text-green-600"
              : "cursor-not-allowed border-gray-300 text-gray-500",
          )}
          disabled={numberOfSelectedOptions !== 6}
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
