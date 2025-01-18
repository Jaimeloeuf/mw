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
    setJohariOptions,
    resetJohariOptions,
    numberOfSelectedOptions,
  };
}
