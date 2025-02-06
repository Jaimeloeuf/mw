import { Link } from "react-router";
import WhatIsThis from "./WhatIsThis";

export default function () {
  return (
    <div className="flex flex-col gap-4">
      <div className="pb-8">
        <WhatIsThis />
      </div>

      <Link
        to="/create"
        className="rounded-lg border border-green-600 p-4 text-2xl text-green-600"
      >
        <div className="flex w-full flex-row items-center justify-between">
          Start
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
  );
}
