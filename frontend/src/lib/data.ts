import React from "react";
import {
  Github,
  Youtube,
  Server,
  NotebookText,
  Globe,
  BrainCircuit,
} from "lucide-react";
import type { LinkProps } from "@/types/link";

const iconSize = 30;

const githubIcon = React.createElement(Github, { size: iconSize });
const youtubeIcon = React.createElement(Youtube, { size: iconSize });
const serverIcon = React.createElement(Server, { size: iconSize });
const canvasIcon = React.createElement(NotebookText, { size: iconSize });
const globeIcon = React.createElement(Globe, { size: iconSize });
const aiIcon = React.createElement(BrainCircuit, { size: iconSize });

export const links: LinkProps[] = [
  {
    id: 1,
    href: "https://github.com/",
    icon: githubIcon,
  },
  {
    id: 6,
    href: "https://claude.ai",
    icon: aiIcon,
  },
  {
    id: 4,
    href: "https://d125.instructure.com/?login_success=1",
    icon: canvasIcon,
  },
  {
    id: 3,
    href: "http://localhost:8080",
    icon: serverIcon,
  },
  {
    id: 5,
    href: "http://localhost:3000",
    icon: globeIcon,
  },
  {
    id: 2,
    href: "https://youtube.com/",
    icon: youtubeIcon,
  },
];
