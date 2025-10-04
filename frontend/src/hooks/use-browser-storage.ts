import { useState, useEffect, useCallback } from "react";
import { RECENT_SEARCH_KEY } from "@/lib/browser/constants";

export const useBrowserStorage = () => {
  const [recentSearch, setRecentSearch] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCH_KEY);
    if (stored) {
      try {
        setRecentSearch(stored);
      } catch {
        console.error("Failed to load recent search");
      }
    }
  }, []);

  const saveToRecent = useCallback((query: string) => {
    if (!query.trim()) return;

    setRecentSearch(query);
    localStorage.setItem(RECENT_SEARCH_KEY, query);
  }, []);

  return { recentSearch, saveToRecent };
};
