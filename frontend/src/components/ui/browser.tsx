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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search Google"
      />
      <button type="submit">Search</button>
    </form>
  );
};
