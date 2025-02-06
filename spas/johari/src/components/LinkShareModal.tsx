import { useState } from "react";
import LinkShareCard from "./LinkShareCard";

export default function LinkShareModal(props: {
  johariID: string;
  ownerName: string;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button
        className="rounded-lg border border-green-600 bg-green-100 px-2 italic text-zinc-600"
        onClick={() => setShowModal(!showModal)}
      >
        share
      </button>

      {showModal && (
        <div
          className="fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center overflow-y-scroll bg-black bg-opacity-80"
          onClick={() => setShowModal(false)}
        >
          <div className="flex w-full flex-row justify-center p-8">
            <div className="rounded-lg bg-white md:max-w-screen-sm">
              <LinkShareCard {...props} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
