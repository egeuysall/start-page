"use client";

import React, { useState, useEffect } from "react";

export const Clock: React.FC = () => {
  const [time, setTime] = useState(getFormattedTime());
  const [showColon, setShowColon] = useState(true);

  function getFormattedTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}${formattedMinutes}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
      setShowColon((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="opacity-75">
      {time.slice(0, time.length - 2)}
      <span className={showColon ? "visible" : "invisible"}>:</span>
      {time.slice(-2)}
    </h1>
  );
};
