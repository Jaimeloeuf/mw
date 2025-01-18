import { useEmptyJohariOptionsSet } from "./useEmptyJohariOptionsSet";

export default function () {
  const {
    johariOptions,
    setJohariOptions,
    resetJohariOptions,
    numberOfSelectedOptions,
  } = useEmptyJohariOptionsSet();

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
          <JohariOptionButton
            key={johariOption}
            johariOption={johariOption}
            isSelected={isSelected}
            toggleSelection={toggleSelection}
          />
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
        >
          Submit
        </button>
      </div>
    </div>
  );
}

function JohariOptionButton(props: {
  johariOption: string;
  isSelected: boolean;
  toggleSelection: (johariOption: string) => void;
}) {
  return (
    <button
      onClick={() => props.toggleSelection(props.johariOption)}
      className={
        "px-4 border rounded-lg " +
        (props.isSelected
          ? "font-light text-green-600 border-green-500"
          : "font-extralight border-gray-300")
      }
    >
      {props.johariOption}
    </button>
  );
}
