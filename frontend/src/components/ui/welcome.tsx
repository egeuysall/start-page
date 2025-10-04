"use client";

import React, { useMemo } from "react";
import { WELCOME_MESSAGES } from "@/lib/constants/messages";
import { getRandomItem } from "@/lib/utils/random";

export const Welcome: React.FC = () => {
  const message = useMemo(() => getRandomItem(WELCOME_MESSAGES), []);
  return <h3>{message}</h3>;
};
