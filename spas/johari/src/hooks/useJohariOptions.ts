import { useMemo } from "react";
import { createEmptyJohariOptionsObject } from "../components/createEmptyJohariOptionsObject";

/**
 * Hook to parse `words` answer into a Johari Options object
 */
export function useJohariOptions(words: string) {
  return useMemo(() => {
    const johariOptions = createEmptyJohariOptionsObject();

    for (const word of words.split(",")) {
      johariOptions[word] = true;
    }

    return johariOptions;
  }, [words]);
}
