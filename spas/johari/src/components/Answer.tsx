import { useEmptyJohariOptionsSet } from "./useEmptyJohariOptionsSet";

export default function () {
  const { johariOptions, setJohariOptions } = useEmptyJohariOptionsSet();

  function toggleSelection(johariOption: string) {
    setJohariOptions(johariOption, johariOptions[johariOption]);
  }

  return (
    <>
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
    </>
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
