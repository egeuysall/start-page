import { useState, useEffect, useCallback } from "react";
import { RECENT_SEARCH_KEY, SEARCH_MODE_KEY } from "@/lib/browser/constants";

export const useBrowserStorage = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchMode, setSearchMode] = useState<"google" | "perplexity">(
    "google",
  );

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCH_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecentSearches(Array.isArray(parsed) ? parsed : []);
      } catch {
        console.error("Failed to load recent searches");
      }
    }

    const storedMode = localStorage.getItem(SEARCH_MODE_KEY);
    if (storedMode === "google" || storedMode === "perplexity") {
      setSearchMode(storedMode);
    }
  }, []);

  const saveToRecent = useCallback((query: string) => {
    if (!query.trim()) return;

    setRecentSearches((prev) => {
      const updated = [query, ...prev.filter((q) => q !== query)].slice(0, 2);
      localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const saveSearchMode = useCallback((mode: "google" | "perplexity") => {
    setSearchMode(mode);
    localStorage.setItem(SEARCH_MODE_KEY, mode);
  }, []);

  return { recentSearches, saveToRecent, searchMode, saveSearchMode };
};
