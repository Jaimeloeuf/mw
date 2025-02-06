import { getLink } from "./getLink";
import CopyOnClick from "./CopyOnClick";

export default function LinkShareCard(props: {
  johariID: string;
  ownerName: string;
}) {
  const answerLink = getLink.toAnswerJohari(props.johariID);
  return (
    <div className="rounded-lg border border-zinc-200 p-6">
      <p className="pb-4 font-light">
        Copy or Share the link and get your family, friends, colleagues, etc...
        to answer for you!
      </p>
      <div className="flex flex-row justify-between gap-8">
        <CopyOnClick textToCopy={answerLink}>
          <button className="w-full rounded-lg border border-zinc-200 px-4 py-2">
            Copy link
          </button>
        </CopyOnClick>
        <button
          className="w-full rounded-lg border border-zinc-200 px-4 py-2"
          onClick={() =>
            navigator.share({
              title: `Johari Window for ${props.ownerName}`,
              text: `Help ${props.ownerName} better understand their personality!`,
              url: answerLink,
            })
          }
        >
          Share link
        </button>
      </div>
    </div>
  );
}
