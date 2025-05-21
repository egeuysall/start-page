"use client";

import React, { useEffect } from "react";
import NextLink from "next/link";
import { LinkProps } from "@/types/link";

export const Link = ({ href, icon, char }: LinkProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === char.toLowerCase()) {
        window.open(href, "_blank");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [char, href]);

  return (
    <NextLink
      href={href}
      className="relative bg-accent-100 w-14 md:w-16 h-14 md:h-16 flex-center rounded-lg"
    >
      <span className="absolute bottom-1 right-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
        {char}
      </span>
      <div className="text-primary-200">{icon}</div>
    </NextLink>
  );
};
