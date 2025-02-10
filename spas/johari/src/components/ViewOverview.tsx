import { useJohariOptions } from "../hooks/useJohariOptions";
import { useJohariAnswerers } from "../hooks/useJohariAnswerers";
import { useJohariWindow } from "../hooks/useJohariWindow";
import { WordWithTooltip } from "./WordWithTooltip";

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

  const johariAnswerers = useJohariAnswerers(props.answers);

  const { arena, blindspot, facade, unknown } = useJohariWindow(
    ownerJohariOptions,
    johariAnswerers,
  );

  return (
    <div>
      <div className="pb-8">
        <p className="text-lg">{props.ownerName}'s overview</p>
        <p className="text-sm font-extralight">
          Hover/Click word to see more details
        </p>
      </div>

      <div className="-m-4 grid grid-cols-[auto_1fr_1fr] justify-start sm:m-0">
        <div></div>
        <p className="max-w-min pb-2 text-sm font-light">Known to self</p>
        <p className="max-w-min pb-2 text-sm font-light">Unknown to self</p>

        <p className="max-w-min pr-2 text-sm font-light sm:pr-4">
          Known to others
        </p>
        <div className="min-h-32 border border-zinc-200 p-2 sm:p-3">
          <p className="pb-1 italic underline decoration-zinc-400">Arena</p>
          {arena.map((res) => (
            <WordWithTooltip key={res.word} {...res} />
          ))}
        </div>
        <div className="min-h-32 border border-zinc-200 p-2 sm:p-3">
          <p className="pb-1 italic underline decoration-zinc-400">Blindspot</p>
          {blindspot.map((res) => (
            <WordWithTooltip key={res.word} {...res} />
          ))}
        </div>

        <p className="max-w-min pr-2 text-sm font-light sm:pr-4">
          Unknown to others
        </p>
        <div className="min-h-32 border border-zinc-200 p-2 sm:p-3">
          <p className="pb-1 italic underline decoration-zinc-400">Facade</p>
          {facade.map((res) => (
            <WordWithTooltip key={res.word} {...res} />
          ))}
        </div>
        <div className="min-h-32 border border-zinc-200 p-2 sm:p-3">
          <p className="pb-1 italic underline decoration-zinc-400">Unknown</p>
          {unknown.map((res) => (
            <WordWithTooltip key={res.word} {...res} />
          ))}
        </div>
      </div>
    </div>
  );
}
