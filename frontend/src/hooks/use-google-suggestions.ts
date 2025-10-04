import { useState, useRef, useCallback } from "react";
import { getGoogleSuggestions } from "@/app/actions/search";
import { SUGGESTION_DEBOUNCE_MS } from "@/lib/browser/constants";

export const useGoogleSuggestions = () => {
  const [googleSuggestions, setGoogleSuggestions] = useState<string[]>([]);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSuggestions = useCallback((value: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (value.trim().length === 0) {
      setGoogleSuggestions([]);
      return;
    }

    debounceTimerRef.current = setTimeout(async () => {
      const suggestions = await getGoogleSuggestions(value);
      if (suggestions) {
        setGoogleSuggestions(suggestions);
      } else {
        setGoogleSuggestions([]);
      }
    }, SUGGESTION_DEBOUNCE_MS);
  }, []);

  return { googleSuggestions, fetchSuggestions };
};
