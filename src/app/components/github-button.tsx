"use client";

import { GitHubIcon } from "../icons/github-icon";

export function GitHubButton() {
  return (
    <a
      href="https://github.com/ShacharHarshuv/open-formata"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      title="View on GitHub"
    >
      <GitHubIcon />
      <span className="max-sm:hidden">GitHub</span>
    </a>
  );
}
