"use client";

import React, { useEffect, useState } from "react";

const messages = [
  "Ege, let’s make it matter.",
  "Welcome back, builder.",
  "Time to create, Ege.",
  "Ege, your space. Your pace.",
  "Let’s spark something, Ege.",
  "Dialed in, Ege.",
  "You’re here. Let’s go.",
  "Back at it, Ege.",
  "Focus mode: Ege.",
  "Ege, it starts now.",
];

export const Welcome: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const random = messages[Math.floor(Math.random() * messages.length)];
    setMessage(random);
  }, []);

  return <h3>{message}</h3>;
};
