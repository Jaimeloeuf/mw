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
        className="px-2 italic bg-green-100 text-zinc-600 border border-green-600 rounded-lg"
        onClick={() => setShowModal(!showModal)}
      >
        share
      </button>

      {showModal && (
        <div
          className="fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center overflow-y-scroll bg-black bg-opacity-80"
          onClick={() => setShowModal(false)}
        >
          <div className="p-8 w-full flex flex-row justify-center">
            <div className="bg-white rounded-lg md:max-w-screen-sm">
              <LinkShareCard {...props} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
