import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEmptyJohariOptionsSet } from "./useEmptyJohariOptionsSet";
import Answer from "./Answer";

/**
 * Form to create a new Johari exercise for self.
 */
export default function () {
  const [name, setName] = useState("");
  const johariAnswerOptions = useEmptyJohariOptionsSet();
  const navigate = useNavigate();

  const mutation = useMutation({
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
        }
      ).then((res) => res.json());
    },
    onSuccess(data) {
      // @todo Generate a shareable link
      // @todo Show button to let them redirect to their main display page
      const johariID = data.data;
      navigate(`/view/${johariID}`);
    },
  });

  return (
    <div>
      <p className="text-2xl pb-6">Create</p>

      <div className="flex flex-row flex-wrap gap-6 w-full">
        <label className="w-full">
          <p className="text-lg">Name</p>
          <input
            type="text"
            name="name"
            id="name"
            className="px-4 py-1 font-extralight outline-none border rounded-lg w-full"
            placeholder="your name so other's know who this window belongs to!"
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
