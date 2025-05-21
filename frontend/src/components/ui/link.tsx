"use client";

import React from "react";
import NextLink from "next/link";
import { LinkProps } from "@/types/link";

export const Link = ({ href, icon }: LinkProps) => {
  return (
    <NextLink
      href={href}
      className="group relative bg-accent-100 w-full p-4 flex-center rounded-lg"
    >
      <div className="text-primary-200 w-full flex-center">{icon}</div>
    </NextLink>
  );
};
