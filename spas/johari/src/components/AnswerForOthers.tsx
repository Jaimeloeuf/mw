import { useState } from "react";
import { useParams, Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import WhatIsThis from "./WhatIsThis";
import Answer from "./Answer";
import ErrorModal from "./ErrorModal";
import { useJohari } from "../hooks/useJohari";
import { useEmptyJohariOptionsSet } from "../hooks/useEmptyJohariOptionsSet";
import type { johariCreateJohariAnswerController_OutputFullDTO } from "@generated-api-types";

export default function () {
  const { johariID } = useParams();

  if (johariID === undefined) {
    throw new Error("Invalid JohariID");
  }

  const { status, isError, error, data } = useJohari(johariID);

  const [name, setName] = useState("");
  const johariAnswerOptions = useEmptyJohariOptionsSet();

  const mutation =
    useMutation<johariCreateJohariAnswerController_OutputFullDTO>({
      mutationFn() {
        return fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/johari/answer`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              johariID,
              name,
              words: johariAnswerOptions.selectedWords,
            }),
          },
        ).then((res) => res.json());
      },
    });

  if (status === "pending") {
    return (
      <p className="py-8 text-center text-2xl font-thin">... loading ...</p>
    );
  }

  if (isError) {
    return (
      <div className="py-8">
        <p className="pb-2 text-2xl">Failed to load Johari</p>
        <p className="text-xl font-thin">{error.toString()}</p>
      </div>
    );
  }

  if (mutation.isError) {
    return <ErrorModal error={mutation.error} clearError={mutation.reset} />;
  }

  if (mutation.isSuccess) {
    return (
      <div className="flex flex-row items-center">
        <div className="w-full">
          <p className="py-10 text-3xl font-thin">Thank you for your answer!</p>

          <div className="rounded-lg border border-green-600">
            <Link to="/create" className="text-2xl font-light text-green-600">
              <div className="flex w-full flex-row items-center justify-between p-4">
                Create your Johari Window
                <svg
                  className="h-5 w-5 shrink-0 rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </div>
            </Link>
          </div>

          <div className="py-8 text-center text-3xl font-thin italic">OR</div>

          <div className="rounded-lg border border-zinc-300">
            <Link to={`/view/${johariID}`} className="text-zinc-600">
              <div className="flex w-full flex-row items-center justify-between p-4">
                See {data.data.name}'s Johari Window
                <svg
                  className="h-3 w-3 shrink-0 rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="pb-12">
        <WhatIsThis />
      </div>

      <p className="pb-4 text-2xl font-light">Why me?</p>
      <p className="pb-8">
        <span className="underline decoration-1 underline-offset-4">
          {data.data.name}
        </span>{" "}
        values your input and need your help to describe them using words in
        this list for them to better understand their own personality!
      </p>

      <div className="flex w-full flex-row flex-wrap gap-6">
        <label className="w-full">
          <p className="text-lg">
            Your name
            <span className="pl-2 text-base font-thin">
              *leave blank to stay anonymous
            </span>
          </p>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full rounded-lg border px-4 py-1 font-extralight outline-none"
            placeholder="your name so other's know who this answer belongs to!"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>

      <div className="pt-8">
        <p className="pb-2 text-lg">
          Choose 6 words that best describes {data.data.name}
        </p>
        <Answer {...johariAnswerOptions} onSubmit={mutation.mutate} />
      </div>
    </div>
  );
}
