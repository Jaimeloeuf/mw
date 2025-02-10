import { useState } from "react";
import { useParams } from "react-router";
import { twJoin } from "tailwind-merge";
import { useJohari } from "./useJohari";
import { useJohariAnswers } from "./useJohariAnswers";
import LinkShareModal from "./LinkShareModal";
import NoAnswerCard from "./NoAnswerCard";
import ViewOverview from "./ViewOverview";
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
    { value: "overview", name: `Overview` },
    {
      value: "answer-self",
      name: `${johariQuery?.data?.data?.name}'s answer`,
    },
    { value: "answer-others-summary", name: "Summary of other's answers" },
    { value: "answer-others-individual", name: "Other's answers" },
  ] as const;

  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]["value"]>("overview");

  if (
    johariQuery.status === "pending" ||
    johariAnswersQuery.status === "pending"
  ) {
    return (
      <p className="py-8 text-center text-2xl font-thin">... loading ...</p>
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
      <div className="flex flex-col gap-2 pb-8 md:flex-row md:justify-between">
        <p className="w-full text-2xl">
          Johari Window for
          <span className="pl-2 font-extralight underline decoration-1 underline-offset-4">
            {johariQuery.data.data.name}
          </span>
        </p>

        <LinkShareModal
          johariID={johariID}
          ownerName={johariQuery.data.data.name}
        />
      </div>

      <div className="mb-8 flex flex-col flex-wrap justify-between gap-2 border-t border-b py-2 sm:flex-row sm:border-t-0">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={twJoin(
              "px-2 text-left sm:text-center",
              tab.value === activeTab && `rounded-lg bg-zinc-200`,
            )}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <ViewOverview
          ownerName={johariQuery.data.data.name}
          ownerAnswerWords={johariQuery.data.data.words}
          answers={johariAnswersQuery.data.data}
        />
      )}

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
