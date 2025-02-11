import { useMemo } from "react";
import { createEmptyJohariOptionsObject } from "../utils/createEmptyJohariOptionsObject";

/**
 * Hook to create a mapping of Johari word to answerers that selected the word
 */
export function useJohariAnswerers(
  answers: Array<{
    data: {
      name: string;
      words: string;
    };
  }>,
) {
  return useMemo(() => {
    const johariWords = Object.keys(createEmptyJohariOptionsObject());
    const johariAnswerers = Object.fromEntries(
      new Map(johariWords.map((word) => [word, [] as Array<string>])),
    );

    for (const answer of answers) {
      for (const word of answer.data.words.split(",")) {
        johariAnswerers[word].push(answer.data.name);
      }
    }

    return johariAnswerers;
  }, [answers]);
}
