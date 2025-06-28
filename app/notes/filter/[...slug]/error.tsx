"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error;
};

export default function NotesError({ error }: ErrorProps) {
  useEffect(() => {
    console.error("Notes page error:", error);
  }, [error]);

  return (
    <p>
      Could not fetch the list of notes. {error.message}
    </p>
  );
}
