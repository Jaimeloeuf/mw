import { useMemo } from "react";
import { createEmptyJohariOptionsObject } from "../utils/createEmptyJohariOptionsObject";

/**
 * Hook to parse array of `words` answer into a Johari Answer Summary object
 */
export function useJohariAnswerSummary(wordsArray: Array<string>) {
  return useMemo(() => {
    const johariWords = Object.keys(createEmptyJohariOptionsObject());
    const johariAnswerSummary = Object.fromEntries(
      new Map(johariWords.map((word) => [word, 0])),
    );

    for (const words of wordsArray) {
      for (const word of words.split(",")) {
        johariAnswerSummary[word]++;
      }
    }

    return johariAnswerSummary;
  }, [wordsArray]);
}
