import { useState, useMemo } from "react";
import { createEmptyJohariOptionsObject } from "./createEmptyJohariOptionsObject";
import { useJohariOptions } from "./useJohariOptions";

/**
 * Component that the Johari window for users to see the high level overview.
 */
export default function (props: {
  ownerName: string;
  ownerAnswerWords: string;
  answers: Array<{
    data: {
      name: string;
      words: string;
    };
  }>;
}) {
  const ownerJohariOptions = useJohariOptions(props.ownerAnswerWords);

  const johariAnswerers = useMemo(() => {
    const johariWords = Object.keys(createEmptyJohariOptionsObject());
    const johariAnswerers = Object.fromEntries(
      new Map(johariWords.map((word) => [word, [] as Array<string>]))
    );

    for (const answer of props.answers) {
      for (const word of answer.data.words.split(",")) {
        johariAnswerers[word].push(answer.data.name);
      }
    }

    return johariAnswerers;
  }, [props.answers]);

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

  return (
    <div>
      <div className="pb-8">
        <p className="text-lg">{props.ownerName}'s overview</p>
        <p className="text-sm font-extralight">
          Hover/Click word to see more details
        </p>
      </div>

      <div className="-m-4 sm:m-0 grid grid-cols-[auto_1fr_1fr] justify-start">
        <div></div>
        <p className="text-sm font-light max-w-min pb-2">Known to self</p>
        <p className="text-sm font-light max-w-min pb-2">Unknown to self</p>

        <p className="text-sm font-light max-w-min pr-2 sm:pr-4">
          Known to others
        </p>
        <div className="min-h-32 p-2 sm:p-3 border border-zinc-200">
          <p className="pb-1 italic underline decoration-zinc-400">Arena</p>
          {arena.map((res) => (
            <WordWithTooltip key={res.word} {...res} />
          ))}
        </div>
        <div className="min-h-32 p-2 sm:p-3 border border-zinc-200">
          <p className="pb-1 italic underline decoration-zinc-400">Blindspot</p>
          {blindspot.map((res) => (
            <WordWithTooltip key={res.word} {...res} />
          ))}
        </div>

        <p className="text-sm font-light max-w-min pr-2 sm:pr-4">
          Unknown to others
        </p>
        <div className="min-h-32 p-2 sm:p-3 border border-zinc-200">
          <p className="pb-1 italic underline decoration-zinc-400">Facade</p>
          {facade.map((res) => (
            <WordWithTooltip key={res.word} {...res} />
          ))}
        </div>
        <div className="min-h-32 p-2 sm:p-3 border border-zinc-200">
          <p className="pb-1 italic underline decoration-zinc-400">Unknown</p>
          {unknown.map((res) => (
            <WordWithTooltip key={res.word} {...res} />
          ))}
        </div>
      </div>
    </div>
  );
}

function WordWithTooltip(props: { word: string; ppl: Array<string> }) {
  if (props.ppl.length === 0) {
    return <p className="font-extralight text-sm">{props.word}</p>;
  }

  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <p
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="cursor-default font-light text-sm sm:text-base"
      >
        ({props.ppl.length}) {props.word}
      </p>

      {isHover && (
        <div
          role="tooltip"
          className="absolute z-10 inline-block pl-2 pr-4 py-1 transition-opacity border border-zinc-400 bg-zinc-50 rounded-lg shadow-2xl"
        >
          {props.word}: {props.ppl.join(", ")}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      )}
    </>
  );
}
