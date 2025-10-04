"use client";

import React, { useState, useEffect } from "react";
import { WELCOME_MESSAGES } from "@/lib/constants/messages";
import { getRandomItem } from "@/lib/utils/random";

export const Welcome: React.FC = () => {
  const [message, setMessage] = useState<string>(WELCOME_MESSAGES[0]);

  useEffect(() => {
    setMessage(getRandomItem(WELCOME_MESSAGES));
  }, []);

  return <h3>{message}</h3>;
};
