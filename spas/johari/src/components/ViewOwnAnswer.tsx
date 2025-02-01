import ViewAnswer from "./ViewAnswer";

/**
 * Component that renders the answers from the Johari's owner.
 */
export default function (props: {
  ownerName: string;
  ownerAnswerWords: string;
}) {
  return (
    <div>
      <p className="pb-6 text-xl">{props.ownerName}'s own answer</p>
      <ViewAnswer words={props.ownerAnswerWords} />
    </div>
  );
}
