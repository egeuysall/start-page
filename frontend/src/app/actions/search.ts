"use server";

import * as convert from "xml-js";
import type { GoogleSuggestionsResponse } from "@/types/browser";

export async function getGoogleSuggestions(query: string): Promise<string[] | null> {
  if (!query || query.trim().length === 0) {
    return null;
  }

  try {
    const url = `https://suggestqueries.google.com/complete/search?output=toolbar&hl=en&q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      console.error("Google suggestions API error:", response.status);
      return null;
    }

    const xmlText = await response.text();
    const json = convert.xml2js(xmlText, {
      compact: true,
    }) as GoogleSuggestionsResponse;

    const suggestions: string[] = [];
    const completeSuggestions = json?.toplevel?.CompleteSuggestion || json?.suggestions?.CompleteSuggestion;

    if (!completeSuggestions) {
      return null;
    }

    const items = Array.isArray(completeSuggestions) ? completeSuggestions : [completeSuggestions];

    for (const item of items) {
      const data = item?.suggestion?._attributes?.data;
      if (data && typeof data === "string") {
        suggestions.push(data);
      }
    }

    return suggestions.slice(0, 5); // Limit to 5 suggestions
  } catch (error) {
    console.error("Failed to fetch Google suggestions:", error);
    return null;
  }
}
