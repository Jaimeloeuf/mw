import { useState } from "react";

export function WordWithTooltip(props: { word: string; ppl: Array<string> }) {
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
          <div className="tooltip-arrow"></div>
        </div>
      )}
    </>
  );
}
