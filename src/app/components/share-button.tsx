"use client";

import { actionTitle } from "@/app/actions/action-title";
import { share } from "@/app/actions/share";
import { useEffect, useRef, useState } from "react";
import { ShareIcon } from "../icons/share-icon";

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
      <ShareIcon />
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
