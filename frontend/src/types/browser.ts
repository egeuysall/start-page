import React from "react";

export type SearchEngine = {
  name: string;
  url: (query: string) => string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
};

export type Suggestion = {
  type: "url" | "search" | "recent" | "engine";
  text: string;
  display: string;
  Icon?: React.ComponentType<{ size?: number; className?: string }>;
  engine?: SearchEngine;
};
