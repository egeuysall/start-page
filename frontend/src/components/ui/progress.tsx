"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { progressBar } from "./progress-bar";

export const Progress: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [mounted, setMounted] = useState(false);

  const update = useCallback(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalHours = hours + minutes / 60;

    if (totalHours < 7) {
      setCurrentTime(0);
    } else if (totalHours >= 23) {
      setCurrentTime(16);
    } else {
      setCurrentTime(totalHours - 7);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, [update]);

  const config = useMemo(
    () => ({
      max: 16,
      min: 0,
      value: mounted ? currentTime : 0,
      gaugePrimaryColor: "#d65d0e",
      gaugeSecondaryColor: "#ebdbb2",
      className: "mx-auto",
    }),
    [currentTime, mounted]
  );

  return progressBar(config);
};
