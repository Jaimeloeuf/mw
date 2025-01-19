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

  const selectedWords = Object.entries(johariOptions)
    .filter(([_, option]) => option)
    .map(([word]) => word);

  const numberOfSelectedOptions = selectedWords.length;

  return {
    johariOptions,
    setJohariOptions,
    resetJohariOptions,
    selectedWords,
    numberOfSelectedOptions,
  };
}
