import ViewSummary from "./ViewSummary";

/**
 * Component that renders a summary of all the words answered for a Johari.
 */
export default function (props: {
  answers: Array<{
    data: {
      name: string;
      words: string;
    };
  }>;
}) {
  return (
    <div>
      <p className="pb-6 text-lg">
        Summary of {props.answers.length} answers from others
      </p>
      <ViewSummary words={props.answers.map((answers) => answers.data.words)} />
    </div>
  );
}
