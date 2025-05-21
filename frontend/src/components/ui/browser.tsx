"use client";

import React, { useState } from "react";

export const Browser: React.FC = () => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = encodeURIComponent(input);
    window.location.href = `https://www.google.com/search?q=${query}`;
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search Google"
        className="w-full caret-primary-200 outline-none focus:ring-2 py-2 px-3 rounded-lg placeholder:opacity-50 placeholder:text-primary-200 focus:ring-primary-200 text-primary-200 transition duration-200 text-base md:text-lg tracking-tight bg-accent-100"
        autoFocus
      />
    </form>
  );
};
