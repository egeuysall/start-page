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
    <form onSubmit={handleSubmit} className="w-full grid gap-4 grid-cols-1 md:grid-cols-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search Google"
        className="md:col-span-3 py-2 px-3 rounded-lg placeholder:opacity-50 placeholder:text-primary-200 focus:ring-primary-200 text-primary-200 transition duration-200 text-base md:text-lg tracking-tight bg-accent-100"
      />
      <button type="submit" className="px-3 py-2 rounded-lg bg-accent-100 text-primary-200 transition duration-200 text-base md:text-lg tracking-tight font-bold hover:opacity-50">Search</button>
    </form>
  );
};
