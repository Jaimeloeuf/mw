import { useState } from "react";
import { useParams } from "react-router";
import { useJohari } from "./useJohari";
import { useJohariAnswers } from "./useJohariAnswers";
import ViewAnswer from "./ViewAnswer";
import ViewAnswersSummary from "./ViewAnswersSummary";
import ViewIndividualAnswers from "./ViewIndividualAnswers";

export default function JohariView() {
  const { johariID } = useParams();

  if (johariID === undefined) {
    throw new Error("Invalid JohariID");
  }

  const johariQuery = useJohari(johariID);
  const johariAnswersQuery = useJohariAnswers(johariID);

  const tabs = [
    {
      value: "answer-self",
      name: `${johariQuery?.data?.data?.name}'s own answer`,
    },
    { value: "answer-others-summary", name: "Summary of other's answers" },
    { value: "answer-others-individual", name: "Other's answers" },
  ] as const;

  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]["value"]>("answer-self");

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
    <div>
      <p className="text-2xl pb-8">
        Johari Window for
        <span className="pl-2 underline underline-offset-4 font-extralight decoration-1">
          {johariQuery.data.data.name}
        </span>
      </p>

      <div className="mb-8 pb-2 border-b flex flex-row flex-wrap justify-between gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
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
          <p className="pb-6 text-xl">
            {johariQuery.data.data.name}'s own answer
          </p>
          <ViewAnswer words={johariQuery.data.data.words} />
        </div>
      )}

      {activeTab === "answer-others-summary" && (
        <ViewAnswersSummary answers={johariAnswersQuery.data.data} />
      )}

      {activeTab === "answer-others-individual" && (
        <ViewIndividualAnswers
          johariID={johariID}
          ownerName={johariQuery.data.data.name}
          answers={johariAnswersQuery.data.data}
        />
      )}
    </div>
  );
}
