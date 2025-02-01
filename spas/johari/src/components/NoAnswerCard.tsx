import { getLink } from "./getLink";
import CopyOnClick from "./CopyOnClick";

export default function NoAnswerCard(props: {
  johariID: string;
  ownerName: string;
}) {
  const answerLink = getLink.toAnswerJohari(props.johariID);
  return (
    <div>
      <p className="py-8 text-4xl font-thin italic">No answers yet</p>

      <div className="p-6 border border-zinc-200 rounded-lg">
        <p className="pb-4 font-light">
          Copy or Share the link and get your family, friends, colleagues,
          etc... to answer for you!
        </p>
        <div className="flex flex-row justify-between gap-8">
          <CopyOnClick textToCopy={answerLink}>
            <button className="px-4 py-2 w-full border border-zinc-200 rounded-lg">
              Copy link
            </button>
          </CopyOnClick>
          <button
            className="px-4 py-2 w-full border border-zinc-200 rounded-lg"
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
    </div>
  );
}
