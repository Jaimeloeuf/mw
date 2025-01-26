import { useState } from "react";
import { useParams } from "react-router-dom";
import { useJohari } from "./useJohari";
import { useJohariAnswers } from "./useJohariAnswers";
import ViewAnswer from "./ViewAnswer";
import ViewSummary from "./ViewSummary";
import ViewIndividualAnswers from "./ViewIndividualAnswers";

export default function JohariLoader() {
  const { johariID } = useParams();

  if (johariID === undefined) {
    throw new Error("Invalid JohariID");
  }

  const johariQuery = useJohari(johariID);
  const johariAnswersQuery = useJohariAnswers(johariID);

  if (
    johariQuery.status === "pending" ||
    johariAnswersQuery.status === "pending"
  ) {
    return (
      <p className="py-8 text-2xl font-thin text-center">... loading ...</p>
    );
  }

  if (johariQuery.isError) {
    throw new Error(`Failed to load Johari ${johariID}`);
  }

  if (johariAnswersQuery.isError) {
    throw new Error(`Failed to load Johari Answers for ${johariID}`);
  }

  return (
    <JohariView
      ownerName={johariQuery.data.data.name}
      ownerWords={johariQuery.data.data.words}
      answers={johariAnswersQuery.data.data}
    />
  );
}

function JohariView(props: {
  ownerName: string;
  ownerWords: string;
  answers: Array<{
    data: {
      name: string;
      words: string;
    };
  }>;
}) {
  const tabs = [
    { value: "answer-self", name: `${props.ownerName}'s own answer` },
    { value: "answer-others-summary", name: "Summary of other's answers" },
    { value: "answer-others-individual", name: "Other's answers" },
  ] as const;

  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]["value"]>("answer-self");

  return (
    <div>
      <p className="text-2xl pb-8">
        Johari Window for
        <span className="pl-2 underline underline-offset-4 font-extralight decoration-1">
          {props.ownerName}
        </span>
      </p>

      <div className="mb-8 pb-2 border-b flex flex-row flex-wrap justify-between gap-2">
        {tabs.map((tab) => (
          <button
            className={
              "px-2 " +
              (tab.value === activeTab ? `bg-blue-100 rounded-lg` : "")
            }
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {activeTab === "answer-self" && (
        <div>
          <p className="pb-6 text-xl">{props.ownerName}'s own answer</p>
          <ViewAnswer words={props.ownerWords} />
        </div>
      )}

      {activeTab === "answer-others-summary" && (
        <div>
          <p className="pb-6 text-xl">
            Summary of {props.answers.length} answers from others
          </p>
          <ViewSummary
            words={props.answers.map((answers) => answers.data.words)}
          />
        </div>
      )}

      {activeTab === "answer-others-individual" && (
        <ViewIndividualAnswers answers={props.answers} />
      )}
    </div>
  );
}
