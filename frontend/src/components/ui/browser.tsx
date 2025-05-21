"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";

export const Browser: React.FC = () => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const redirect = () => {
    // encode input and redirect to Google search
    const query = encodeURIComponent(input);
    router.push(`https://www.google.com/search?q=${query}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    redirect();
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
