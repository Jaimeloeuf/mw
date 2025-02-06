import { useMemo } from "react";

/**
 * Hook to generate the 4 different arrays in the window
 */
export function useJohariWindow(
  ownerJohariOptions: Record<string, boolean>,
  johariAnswerers: Record<string, Array<string>>,
) {
  return useMemo(() => {
    const arena: Array<{
      word: string;
      ppl: Array<string>;
    }> = [];
    const blindspot: Array<{
      word: string;
      ppl: Array<string>;
    }> = [];
    const facade: Array<{
      word: string;
      ppl: Array<string>;
    }> = [];
    const unknown: Array<{
      word: string;
      ppl: Array<string>;
    }> = [];

    for (const [word, answerers] of Object.entries(johariAnswerers)) {
      // Known to self
      if (ownerJohariOptions[word]) {
        // Known to self && Known to others
        if (answerers.length !== 0) {
          arena.push({
            word,
            ppl: ["You", ...answerers],
          });
        }

        // Known to self && Unknown to others
        else {
          facade.push({
            word,
            ppl: ["You"],
          });
        }
      }

      // Unknown to self
      else {
        // Unknown to self && Known to others
        if (answerers.length !== 0) {
          blindspot.push({
            word,
            ppl: answerers,
          });
        }

        // Unknown to self && Unknown to others
        else {
          unknown.push({
            word,
            ppl: [],
          });
        }
      }
    }

    // Sort the arrays by most answered word first
    arena.sort((a, b) => b.ppl.length - a.ppl.length);
    blindspot.sort((a, b) => b.ppl.length - a.ppl.length);
    facade.sort((a, b) => b.ppl.length - a.ppl.length);
    unknown.sort((a, b) => b.ppl.length - a.ppl.length);

    return {
      arena,
      blindspot,
      facade,
      unknown,
    };
  }, [ownerJohariOptions, johariAnswerers]);
}
