import { useState } from "react";
import { useEmptyJohariOptionsSet } from "./useEmptyJohariOptionsSet";
import Answer from "./Answer";

/**
 * Form to create a new Johari exercise for self.
 */
export default function () {
  const [name, setName] = useState("");
  const johariAnswerOptions = useEmptyJohariOptionsSet();

  function onSubmit() {
    if (name === "") {
      alert("Name cannot be empty!");
      return;
    }
  }

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
        <Answer {...johariAnswerOptions} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
