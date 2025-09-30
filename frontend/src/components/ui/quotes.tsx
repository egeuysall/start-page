"use client";

import React, { useMemo } from "react";

const messages: string[] = [
  "Your time is limited, so don't waste it living someone else's life.",
  "The people who are crazy enough to think they can change the world are the ones who do.",
  "Stay hungry, stay foolish.",
  "Innovation distinguishes between a leader and a follower.",
  "Design is not just what it looks like and feels like. Design is how it works.",
  "Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose.",
  "I'm convinced that about half of what separates successful entrepreneurs from the non-successful ones is pure perseverance.",
  "Have the courage to follow your heart and intuition. They somehow already know what you truly want to become.",
];

export const Quotes: React.FC = () => {
  const message = useMemo(
    () => messages[Math.floor(Math.random() * messages.length)],
    []
  );

  return <p className="opacity-50">{message}</p>;
};
