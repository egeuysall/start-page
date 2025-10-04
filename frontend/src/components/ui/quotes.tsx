"use client";

import React, { useMemo } from "react";
import { QUOTES } from "@/lib/constants/messages";
import { getRandomItem } from "@/lib/utils/random";

export const Quotes: React.FC = () => {
  const quote = useMemo(() => getRandomItem(QUOTES), []);
  return <p className="opacity-50">{quote}</p>;
};
