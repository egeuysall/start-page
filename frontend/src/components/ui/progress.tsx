"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { progressBar } from "./progress-bar";

export const Progress: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(0);

  const update = useCallback(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    setCurrentTime(hours + minutes / 60);
  }, []);

  useEffect(() => {
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, [update]);

  const config = useMemo(
    () => ({
      max: 24,
      min: 0,
      value: currentTime,
      gaugePrimaryColor: "#d65d0e",
      gaugeSecondaryColor: "#ebdbb2",
      className: "mx-auto",
    }),
    [currentTime]
  );

  return progressBar(config);
};
