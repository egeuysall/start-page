"use client";

import React, { useEffect, useState, useMemo } from "react";
import { progressBar } from "./progress-bar";
import { calculateProgressTime } from "@/lib/utils/time-utils";

export const Progress: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(calculateProgressTime());

    // Update every minute
    const timer = setInterval(() => {
      setCurrentTime(calculateProgressTime());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const config = useMemo(
    () => ({
      max: 16,
      min: 0,
      value: mounted ? currentTime : 0,
      gaugePrimaryColor: "#d65d0e",
      gaugeSecondaryColor: "#ebdbb2",
      className: "mx-auto",
    }),
    [currentTime, mounted],
  );

  return progressBar(config);
};
