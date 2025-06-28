"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function NoteDetailsError({ error }: ErrorProps) {
  useEffect(() => {
    console.error("Note details error:", error);
  }, [error]);

  return (
    <p>Could not fetch note details. {error.message}</p>
  );
}
