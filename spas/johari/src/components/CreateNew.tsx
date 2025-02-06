import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router";
import { useEmptyJohariOptionsSet } from "./useEmptyJohariOptionsSet";
import LinkShareCard from "./LinkShareCard";
import Answer from "./Answer";
import ErrorModal from "./ErrorModal";
import type { johariCreateJohariController_OutputFullDTO } from "@generated-api-types";

/**
 * Form to create a new Johari exercise for self.
 */
export default function () {
  const [name, setName] = useState("");
  const johariAnswerOptions = useEmptyJohariOptionsSet();

  const mutation = useMutation<johariCreateJohariController_OutputFullDTO>({
    mutationFn() {
      if (name === "") {
        throw new Error("Name cannot be empty!");
      }

      return fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/johari/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            words: johariAnswerOptions.selectedWords,
          }),
        },
      ).then((res) => res.json());
    },
  });

  if (mutation.isError) {
    return <ErrorModal error={mutation.error} clearError={mutation.reset} />;
  }

  if (mutation.isSuccess) {
    return (
      <div className="flex flex-row items-center">
        <div>
          <p className="py-8 text-3xl font-thin">
            Yay your Johari Window is created!
          </p>

          <div className="pb-8">
            <LinkShareCard johariID={mutation.data.data} ownerName={name} />
          </div>

          <div className="rounded-lg border border-green-600">
            <Link
              to={`/view/${mutation.data.data}`}
              className="text-2xl text-green-600"
            >
              <div className="flex w-full flex-row items-center justify-between p-4">
                See your Johari Window
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
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="pb-6 text-2xl">Create</p>

      <div className="flex w-full flex-row flex-wrap gap-6">
        <label className="w-full">
          <p className="text-lg">Name</p>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full rounded-lg border px-4 py-1 font-extralight outline-none"
            placeholder="your name so other's know who this window belongs to!"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>

      <div className="pt-8">
        <p className="pb-2 text-lg">
          Choose 6 words that best describes yourself
        </p>
        <Answer {...johariAnswerOptions} onSubmit={mutation.mutate} />
      </div>
    </div>
  );
}
