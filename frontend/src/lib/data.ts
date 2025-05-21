import React from "react";
import {
  Github,
  Youtube,
  PenLine,
  Triangle,
  Globe,
  BrainCircuit,
} from "lucide-react";
import type { LinkProps } from "@/types/link";

const iconSize = 30;

const githubIcon = React.createElement(Github, { size: iconSize });
const youtubeIcon = React.createElement(Youtube, { size: iconSize });
const notionIcon = React.createElement(PenLine, { size: iconSize });
const vercelIcon = React.createElement(Triangle, { size: iconSize });
const globeIcon = React.createElement(Globe, { size: iconSize });
const chatgptIcon = React.createElement(BrainCircuit, { size: iconSize });

export const links: LinkProps[] = [
  {
    id: 1,
    href: "https://github.com/",
    icon: githubIcon,
  },
  {
    id: 2,
    href: "https://youtube.com/",
    icon: youtubeIcon,
  },
  {
    id: 3,
    href: "https://www.notion.so",
    icon: notionIcon,
  },
  {
    id: 4,
    href: "https://vercel.com",
    icon: vercelIcon,
  },
  {
    id: 5,
    href: "http://localhost:3000",
    icon: globeIcon,
  },
  {
    id: 6,
    href: "https://chatgpt.com/",
    icon: chatgptIcon,
  },
];
