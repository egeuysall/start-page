import React from "react";

export type SearchEngine = {
  name: string;
  url: (query: string) => string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
};

export type Suggestion = {
  type: "url" | "search" | "recent" | "engine" | "google";
  text: string;
  display: string;
  Icon?: React.ComponentType<{ size?: number; className?: string }>;
  engine?: SearchEngine;
};

export type GoogleSuggestionsResponse = {
  toplevel?: {
    CompleteSuggestion?:
      | {
          suggestion?: {
            _attributes?: {
              data?: string;
            };
          };
        }
      | Array<{
          suggestion?: {
            _attributes?: {
              data?: string;
            };
          };
        }>;
  };
  suggestions?: {
    CompleteSuggestion?:
      | {
          suggestion?: {
            _attributes?: {
              data?: string;
            };
          };
        }
      | Array<{
          suggestion?: {
            _attributes?: {
              data?: string;
            };
          };
        }>;
  };
};
