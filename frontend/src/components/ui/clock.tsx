"use client";

import React, { useState, useEffect } from "react";
import { getFormattedTime } from "@/lib/utils/time-utils";

export const Clock: React.FC = () => {
  const [time, setTime] = useState(getFormattedTime());
  const [showColon, setShowColon] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
      setShowColon((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1>
      {time.slice(0, -2)}
      <span className={showColon ? "visible" : "invisible"}>:</span>
      {time.slice(-2)}
    </h1>
  );
};
