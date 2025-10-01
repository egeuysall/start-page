"use client";

import React, { useMemo } from "react";

const messages: string[] = [
  "Ege, let's make it matter.",
  "Welcome back, builder.",
  "Time to create, Ege.",
  "Ege, your space. Your pace.",
  "Let's spark something, Ege.",
  "Dialed in, Ege.",
  "You're here. Let's go.",
  "Back at it, Ege.",
  "Focus mode: Ege.",
  "Ege, it starts now.",
];

export const Welcome: React.FC = () => {
  const message = useMemo(
    () => messages[Math.floor(Math.random() * messages.length)],
    []
  );

  return <h3>{message}</h3>;
};
