import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <h2>Home</h2>
      <ul>
        <li>
          <Link href="/about">About (App Router)</Link>
        </li>
      </ul>
    </>
  );
}
