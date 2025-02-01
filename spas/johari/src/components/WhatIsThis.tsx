export default function WhatIsThis() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-light">What is this?</p>

      <p>
        The Johari window{" "}
        <span className="text-sm font-light">
          (invented by Joseph Luft and Harrington Ingham in the 1950s)
        </span>{" "}
        is used to help people better understand their relationship with
        themselves and others, in other words, how aware are you about your own
        personality?
      </p>
      <p>
        By describing yourself using words from a fixed list of adjectives, then
        asking your family, friends and colleagues to describe you from the same
        list, you can then view the list of overlaps and differences.
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
  );
}
