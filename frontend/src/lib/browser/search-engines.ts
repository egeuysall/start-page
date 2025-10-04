import { Search, Youtube, Github, Sparkles } from "lucide-react";
import type { SearchEngine } from "@/types/browser";

export const searchEngines: SearchEngine[] = [
  {
    name: "Google",
    url: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
    Icon: Search,
  },
  {
    name: "Perplexity",
    url: (q) => `https://www.perplexity.ai/search?q=${encodeURIComponent(q)}`,
    Icon: Sparkles,
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
];
