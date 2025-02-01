import type { ReactNode } from "react";

/**
 * A wrapper to copy something to clipboard on click with no UI changes.
 */
export default function CopyOnClick(props: {
  children: ReactNode;
  textToCopy: string;
}) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(props.textToCopy);
      alert("Copied!");
    } catch (error) {
      alert(`Failed to copy: ${error?.toString()}`);
    }
  }

  return (
    <span className="cursor-pointer select-none w-full" onClick={copy}>
      {props.children}
    </span>
  );
}
