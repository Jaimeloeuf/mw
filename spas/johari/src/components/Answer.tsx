import { useEmptyJohariOptionsSet } from "./useEmptyJohariOptionsSet";

export default function () {
  const {
    johariOptions,
    setJohariOptions,
    resetJohariOptions,
    numberOfSelectedOptions,
  } = useEmptyJohariOptionsSet();

  function toggleSelection(johariOption: string) {
    setJohariOptions(johariOption, johariOptions[johariOption]);
  }

  return (
    <div className="max-w-screen-sm">
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

      <div className="flex flex-row flex-wrap gap-8">
        {Object.entries(johariOptions).map(([johariOption, isSelected]) => (
          <JohariOptionButton
            key={johariOption}
            johariOption={johariOption}
            isSelected={isSelected}
            toggleSelection={toggleSelection}
          />
        ))}
      </div>

      <div>
        <button className="" disabled={numberOfSelectedOptions !== 6}>
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
        "px-4 border border-gray-600 rounded-lg " +
        (props.isSelected ? "bg-white" : "bg-gray-200")
      }
    >
      {props.johariOption}
    </button>
  );
}
