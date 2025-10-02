"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Search,
  Globe,
  Clock,
  Youtube,
  Github,
  MessageSquare,
} from "lucide-react";
import type { SearchEngine, Suggestion } from "@/types/browser";
import { getGoogleSuggestions } from "@/app/actions/search";

const isValidUrl = (input: string): boolean => {
  if (input.match(/^localhost(:\d+)?/i)) return true;
  if (input.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?/)) return true;

  const domainPattern = /^([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/.*)?$/i;
  if (domainPattern.test(input)) return true;

  try {
    const url = new URL(input.startsWith("http") ? input : `https://${input}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
};

const normalizeUrl = (input: string): string => {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    return input;
  }
  return `https://${input}`;
};

const searchEngines: SearchEngine[] = [
  {
    name: "Google",
    url: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
    Icon: Search,
  },
  {
    name: "YouTube",
    url: (q) =>
      `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
    Icon: Youtube,
  },
  {
    name: "GitHub",
    url: (q) => `https://github.com/search?q=${encodeURIComponent(q)}`,
    Icon: Github,
  },
  {
    name: "Reddit",
    url: (q) => `https://www.reddit.com/search?q=${encodeURIComponent(q)}`,
    Icon: MessageSquare,
  },
];

const RECENT_SEARCH_KEY = "browser_recent_search";

export const Browser: React.FC = () => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearch, setRecentSearch] = useState<string>("");
  const [googleSuggestions, setGoogleSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const suggestions = useCallback((): Suggestion[] => {
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
        Icon: Search,
      });
    });

    if (isValidUrl(trimmedInput)) {
      results.push({
        type: "url",
        text: normalizeUrl(trimmedInput),
        display: `Go to ${trimmedInput}`,
        Icon: Globe,
      });
    }

    searchEngines.forEach((engine) => {
      results.push({
        type: "engine",
        text: trimmedInput,
        display: `Search on ${engine.name}`,
        Icon: engine.Icon,
        engine,
      });
    });

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

    return results;
  }, [input, recentSearch, googleSuggestions]);

  const currentSuggestions = suggestions();

  const navigate = useCallback(
    (suggestion: Suggestion) => {
      if (suggestion.type === "url") {
        window.location.href = suggestion.text;
      } else if (suggestion.type === "engine" && suggestion.engine) {
        const query = suggestion.text.replace(/^(gh|yt)\s+/i, "");
        saveToRecent(query);
        window.location.href = suggestion.engine.url(query);
      } else if (suggestion.type === "recent") {
        setInput(suggestion.text);
        const query = suggestion.text;
        saveToRecent(query);
        window.location.href = searchEngines[0].url(query);
      } else if (suggestion.type === "google") {
        saveToRecent(suggestion.text);
        window.location.href = searchEngines[0].url(suggestion.text);
      }
    },
    [saveToRecent],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedInput = input.trim();
      if (!trimmedInput) return;

      if (isValidUrl(trimmedInput)) {
        window.location.href = normalizeUrl(trimmedInput);
      } else {
        if (currentSuggestions[selectedIndex]) {
          navigate(currentSuggestions[selectedIndex]);
        } else {
          saveToRecent(trimmedInput);
          window.location.href = searchEngines[0].url(trimmedInput);
        }
      }
    },
    [input, currentSuggestions, selectedIndex, navigate, saveToRecent],
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setShowSuggestions(true);
    setSelectedIndex(0);

    // Debounce Google suggestions API call
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
    }, 300);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showSuggestions) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < currentSuggestions.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case "Escape":
          e.preventDefault();
          setShowSuggestions(false);
          setSelectedIndex(0);
          break;
        case "Tab":
          if (currentSuggestions.length > 0) {
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % currentSuggestions.length);
          }
          break;
      }
    },
    [showSuggestions, currentSuggestions.length],
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="w-full relative">
      <form onSubmit={handleSubmit} className="w-full flex-center">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search or enter URL"
          className="w-full caret-primary-200 outline-none focus:ring-2 py-2 px-3 rounded-lg placeholder:opacity-50 placeholder:text-primary-200 focus:ring-primary-200 text-primary-200 transition duration-200 text-base md:text-lg tracking-tight bg-accent-100"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </form>

      {showSuggestions && currentSuggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute w-full mt-2 bg-accent-100 rounded-lg shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-200"
        >
          {currentSuggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${index}`}
              type="button"
              onClick={() => navigate(suggestion)}
              className={`w-full px-3 py-2 text-left flex items-center gap-3 transition-colors duration-150 ${
                index === selectedIndex
                  ? "bg-primary-200/10 text-primary-200"
                  : "text-primary-200/70 hover:bg-primary-200/5 hover:text-primary-200"
              }`}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {suggestion.Icon && (
                <suggestion.Icon
                  size={18}
                  className="flex-shrink-0 opacity-70"
                />
              )}
              <span className="flex-1 truncate text-sm md:text-base">
                {suggestion.display}
              </span>
              {suggestion.type === "recent" && (
                <span className="text-xs opacity-50">Recent</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
