"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import type { Suggestion } from "@/types/browser";
import { isValidUrl, normalizeUrl } from "@/lib/browser/url-utils";
import { searchEngines } from "@/lib/browser/search-engines";
import { buildSuggestions } from "@/lib/browser/suggestion-utils";
import { useBrowserStorage } from "@/hooks/use-browser-storage";
import { useGoogleSuggestions } from "@/hooks/use-google-suggestions";

export const Browser: React.FC = () => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPerplexityMode, setIsPerplexityMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { recentSearch, saveToRecent } = useBrowserStorage();
  const { googleSuggestions, fetchSuggestions } = useGoogleSuggestions();

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K: Focus search input
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      // Option + P: Toggle Perplexity mode (π is the macOS alt+p character)
      if (e.altKey && (e.key === "p" || e.key === "π")) {
        e.preventDefault();
        setIsPerplexityMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentSuggestions = buildSuggestions(
    input,
    recentSearch,
    googleSuggestions,
  );

  // Handle navigation based on suggestion type
  const navigate = useCallback(
    (suggestion: Suggestion) => {
      const perplexityEngine = searchEngines.find(
        (e) => e.name === "Perplexity",
      );
      const defaultEngine =
        isPerplexityMode && perplexityEngine
          ? perplexityEngine
          : searchEngines[0];

      if (suggestion.type === "url") {
        window.location.href = suggestion.text;
      } else if (suggestion.type === "engine" && suggestion.engine) {
        // Handle engine-specific searches (e.g., "gh repo" for GitHub)
        const query = suggestion.text.replace(/^(gh|yt)\s+/i, "");
        saveToRecent(query);
        window.location.href = suggestion.engine.url(query);
      } else if (suggestion.type === "recent") {
        setInput(suggestion.text);
        const query = suggestion.text;
        saveToRecent(query);
        window.location.href = defaultEngine.url(query);
      } else if (suggestion.type === "google") {
        saveToRecent(suggestion.text);
        window.location.href = defaultEngine.url(suggestion.text);
      }
    },
    [saveToRecent, isPerplexityMode],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedInput = input.trim();
      if (!trimmedInput) return;

      const perplexityEngine = searchEngines.find(
        (e) => e.name === "Perplexity",
      );
      const defaultEngine =
        isPerplexityMode && perplexityEngine
          ? perplexityEngine
          : searchEngines[0];

      if (isValidUrl(trimmedInput)) {
        window.location.href = normalizeUrl(trimmedInput);
      } else {
        if (currentSuggestions[selectedIndex]) {
          navigate(currentSuggestions[selectedIndex]);
        } else {
          saveToRecent(trimmedInput);
          window.location.href = defaultEngine.url(trimmedInput);
        }
      }
    },
    [
      input,
      currentSuggestions,
      selectedIndex,
      navigate,
      saveToRecent,
      isPerplexityMode,
    ],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInput(value);
      setShowSuggestions(true);
      setSelectedIndex(0);
      fetchSuggestions(value);
    },
    [fetchSuggestions],
  );

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
    <div className="w-full flex flex-col gap-4">
      <h5 className="text-left w-full">
        {isPerplexityMode ? "Ask Perplexity" : "Search"}
      </h5>
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
    </div>
  );
};
