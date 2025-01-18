import { useState, useCallback } from "react";
import { createEmptyJohariOptionsObject } from "./createEmptyJohariOptionsObject";

export function useEmptyJohariOptionsSet() {
  const [johariOptions, setJohariOptions] = useState<Record<string, boolean>>(
    createEmptyJohariOptionsObject()
  );

  const resetJohariOptions = useCallback(
    () => setJohariOptions(createEmptyJohariOptionsObject()),
    [setJohariOptions]
  );

  const numberOfSelectedOptions = Object.values(johariOptions).filter(
    (option) => option
  ).length;

  return {
    johariOptions,
    setJohariOptions(johariOption: string, option: boolean) {
      if (numberOfSelectedOptions > 5) {
        alert("You can only select up to 6 words");
        return;
      }

      setJohariOptions({
        ...johariOptions,
        [johariOption]: !option,
      });
    },
    resetJohariOptions,
    numberOfSelectedOptions,
  };
}
