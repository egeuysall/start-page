import { Globe, Clock } from "lucide-react";
import type { Suggestion } from "@/types/browser";
import { isValidUrl, normalizeUrl } from "./url-utils";
import { searchEngines } from "./search-engines";

export const buildSuggestions = (
  input: string,
  recentSearch: string,
  googleSuggestions: string[],
): Suggestion[] => {
  const trimmedInput = input.trim();
  const results: Suggestion[] = [];

  if (!trimmedInput) {
    if (recentSearch) {
      return [
        {
          type: "recent",
          text: recentSearch,
          display: recentSearch,
          Icon: Clock,
        },
      ];
    }
    return [];
  }

  // Add Google suggestions first
  googleSuggestions.forEach((suggestion) => {
    results.push({
      type: "google",
      text: suggestion,
      display: suggestion,
      Icon: searchEngines[0].Icon,
    });
  });

  // Add URL suggestion if valid
  if (isValidUrl(trimmedInput)) {
    results.push({
      type: "url",
      text: normalizeUrl(trimmedInput),
      display: `Go to ${trimmedInput}`,
      Icon: Globe,
    });
  }

  // Add search engine suggestions
  searchEngines.forEach((engine) => {
    results.push({
      type: "engine",
      text: trimmedInput,
      display: `Search on ${engine.name}`,
      Icon: engine.Icon,
      engine,
    });
  });

  // Prioritize GitHub if input mentions it
  if (
    trimmedInput.toLowerCase().includes("github") ||
    trimmedInput.startsWith("gh ")
  ) {
    const idx = results.findIndex((r) => r.engine?.name === "GitHub");
    if (idx > -1) {
      const [github] = results.splice(idx, 1);
      results.unshift(github);
    }
  }

  // Prioritize YouTube if input mentions it
  if (
    trimmedInput.toLowerCase().includes("youtube") ||
    trimmedInput.startsWith("yt ")
  ) {
    const idx = results.findIndex((r) => r.engine?.name === "YouTube");
    if (idx > -1) {
      const [yt] = results.splice(idx, 1);
      results.unshift(yt);
    }
  }

  // Prioritize Perplexity if input mentions it
  if (
    trimmedInput.toLowerCase().includes("perplexity") ||
    trimmedInput.startsWith("px ")
  ) {
    const idx = results.findIndex((r) => r.engine?.name === "Perplexity");
    if (idx > -1) {
      const [perplexity] = results.splice(idx, 1);
      results.unshift(perplexity);
    }
  }

  return results;
};
