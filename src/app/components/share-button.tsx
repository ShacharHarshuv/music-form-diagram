"use client";

import { actionTitle } from "@/app/actions/action-title";
import { share } from "@/app/actions/share";
import { useEffect, useRef, useState } from "react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    return share.onCall(() => {
      setCopied(true);
      buttonRef.current?.focus();
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    /* TODO: the title should use the action data */
    <button
      ref={buttonRef}
      onClick={() => share()}
      className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      title={actionTitle(share)}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
        />
      </svg>
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
