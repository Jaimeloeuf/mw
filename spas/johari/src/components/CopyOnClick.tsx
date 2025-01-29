import type { ReactNode } from "react";

/**
 * A wrapper to copy something to clipboard on click with no UI changes.
 */
export default function CopyOnClick(props: {
  children: ReactNode;
  textToCopy: string;
}) {
  return (
    <span
      className="cursor-pointer select-none w-full"
      onClick={() => navigator.clipboard.writeText(props.textToCopy)}
    >
      {props.children}
    </span>
  );
}
