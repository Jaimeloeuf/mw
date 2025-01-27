import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useEmptyJohariOptionsSet } from "./useEmptyJohariOptionsSet";
import Answer from "./Answer";
import { useJohari } from "./useJohari";

export default function () {
  const { johariID } = useParams();

  if (johariID === undefined) {
    throw new Error("Invalid JohariID");
  }

  const { status, isError, error, data } = useJohari(johariID);

  const [name, setName] = useState("");
  const johariAnswerOptions = useEmptyJohariOptionsSet();
  const navigate = useNavigate();

  const mutation = useMutation({
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
        }
      ).then((res) => res.json());
    },
    onSuccess() {
      // @todo Show button to let them redirect to their main display page or Create their own one
      navigate(`/view/${johariID}`);
    },
  });

  if (status === "pending") {
    return (
      <p className="py-8 text-2xl font-thin text-center">... loading ...</p>
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

  return (
    <div>
      <p className="text-2xl pb-6">
        Answer for
        <span className="pl-2 underline underline-offset-4 font-extralight decoration-1">
          {data.data.name}
        </span>
      </p>

      <div className="flex flex-row flex-wrap gap-6 w-full">
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
            className="px-4 py-1 font-extralight outline-none border rounded-lg w-full"
            placeholder="your name so other's know who this answer belongs to!"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>

      <div className="pt-8">
        <Answer {...johariAnswerOptions} onSubmit={mutation.mutate} />
      </div>
    </div>
  );
}
