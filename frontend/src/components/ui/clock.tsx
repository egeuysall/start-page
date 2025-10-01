"use client";

import React, { useState, useEffect, useCallback } from "react";

export const Clock: React.FC = () => {
  const getFormattedTime = useCallback(() => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}${formattedMinutes}`;
  }, []);

  const [time, setTime] = useState(getFormattedTime());
  const [showColon, setShowColon] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
      setShowColon((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, [getFormattedTime]);

  return (
    <h1>
      {time.slice(0, time.length - 2)}
      <span className={showColon ? "visible" : "invisible"}>:</span>
      {time.slice(-2)}
    </h1>
  );
};
