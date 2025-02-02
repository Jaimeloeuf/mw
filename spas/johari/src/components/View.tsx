import { useState } from "react";
import { useParams } from "react-router";
import { useJohari } from "./useJohari";
import { useJohariAnswers } from "./useJohariAnswers";
import LinkShareModal from "./LinkShareModal";
import NoAnswerCard from "./NoAnswerCard";
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
      name: `${johariQuery?.data?.data?.name}'s answer`,
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
      <div className="pb-8 flex flex-col gap-2 md:flex-row md:justify-between">
        <p className="text-2xl w-full">
          Johari Window for
          <span className="pl-2 underline underline-offset-4 font-extralight decoration-1">
            {johariQuery.data.data.name}
          </span>
        </p>

        <LinkShareModal
          johariID={johariID}
          ownerName={johariQuery.data.data.name}
        />
      </div>

      <div className="mb-8 py-2 border-t sm:border-t-0 border-b flex flex-col sm:flex-row flex-wrap justify-between gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={
              "text-left sm:text-center px-2 " +
              (tab.value === activeTab ? `bg-zinc-200 rounded-lg` : "")
            }
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {activeTab === "answer-self" && (
        <ViewAnswer words={johariQuery.data.data.words} />
      )}

      {activeTab === "answer-others-summary" &&
        (johariAnswersQuery.data.data.length === 0 ? (
          <NoAnswerCard
            johariID={johariID}
            ownerName={johariQuery.data.data.name}
          />
        ) : (
          <ViewAnswersSummary answers={johariAnswersQuery.data.data} />
        ))}

      {activeTab === "answer-others-individual" &&
        (johariAnswersQuery.data.data.length === 0 ? (
          <NoAnswerCard
            johariID={johariID}
            ownerName={johariQuery.data.data.name}
          />
        ) : (
          <ViewIndividualAnswers
            johariID={johariID}
            ownerName={johariQuery.data.data.name}
            answers={johariAnswersQuery.data.data}
          />
        ))}
    </div>
  );
}
