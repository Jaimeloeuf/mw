import type { useEmptyJohariOptionsSet } from "./useEmptyJohariOptionsSet";

export default function (
  props: ReturnType<typeof useEmptyJohariOptionsSet> & { onSubmit: () => void }
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
      <div className="pb-4 flex flex-row justify-between">
        <p className="text-lg">Selected {numberOfSelectedOptions}/6 words</p>
        <button
          className="px-4 text-red-500 border border-red-500 rounded-lg"
          disabled={numberOfSelectedOptions === 0}
          onClick={resetJohariOptions}
        >
          reset
        </button>
      </div>

      <div className="flex flex-row flex-wrap gap-6">
        {Object.entries(johariOptions).map(([johariOption, isSelected]) => (
          <button
            onClick={() => toggleSelection(johariOption)}
            className={
              "px-4 border rounded-lg " +
              (isSelected
                ? "font-light text-green-600 border-green-500"
                : "font-extralight border-gray-300")
            }
          >
            {johariOption}
          </button>
        ))}
      </div>

      <div className="pt-8">
        <button
          className={
            "px-4 text-lg border rounded-lg " +
            (numberOfSelectedOptions === 6
              ? "text-green-600 border-green-600"
              : "cursor-not-allowed text-gray-500 border-gray-300")
          }
          disabled={numberOfSelectedOptions !== 6}
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
