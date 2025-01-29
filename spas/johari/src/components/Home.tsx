import { Link } from "react-router";

export default function () {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 pb-4">
        <p>
          The Johari window{" "}
          <span className="text-sm font-light">
            (invented by Joseph Luft and Harrington Ingham in the 1950s)
          </span>{" "}
          is used to help people better understand their relationship with
          themselves and others, in other words, how aware are you about your
          own personality?
        </p>
        <p>
          By describing yourself using words from a fixed list of adjectives,
          then asking your family, friends and colleagues to describe you from
          the same list, you can then view the list of overlaps and differences.
        </p>

        <p>
          Read more on the &nbsp;
          <a
            href="https://en.wikipedia.org/wiki/Johari_window"
            className="underline"
            target="_blank"
            rel="noopener"
          >
            wikipedia page on Johari Window
          </a>
        </p>
      </div>

      <Link
        to="/create"
        className="p-4 text-green-600 text-2xl border border-green-600 rounded-lg"
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
