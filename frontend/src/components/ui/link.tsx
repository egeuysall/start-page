"use client";

import React, { useEffect } from "react";
import NextLink from "next/link";
import { LinkProps } from "@/types/link";

export const Link = ({ href, icon, char }: LinkProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === char.toLowerCase()) {
        window.location.href = href;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [char, href]);

  return (
    <NextLink
      href={href}
      className="group relative bg-accent-100 p-4 flex-center rounded-lg"
    >
      <span className="absolute bottom-1 right-1 text-xs text-muted-foreground opacity-0 hover:opacity-100 transition duration-200">
        {char}
      </span>
      <div className="text-primary-200">{icon}</div>
    </NextLink>
  );
};
