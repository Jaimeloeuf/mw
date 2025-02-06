import { useState } from "react";

export function WordWithTooltip(props: { word: string; ppl: Array<string> }) {
  if (props.ppl.length === 0) {
    return <p className="text-sm font-extralight">{props.word}</p>;
  }

  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <p
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="cursor-default text-sm font-light sm:text-base"
      >
        ({props.ppl.length}) {props.word}
      </p>

      {isHover && (
        <div
          role="tooltip"
          className="absolute z-10 inline-block rounded-lg border border-zinc-400 bg-zinc-50 py-1 pl-2 pr-4 shadow-2xl transition-opacity"
        >
          {props.word}: {props.ppl.join(", ")}
          <div className="tooltip-arrow"></div>
        </div>
      )}
    </>
  );
}
