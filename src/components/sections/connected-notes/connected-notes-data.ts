import type { LucideIcon } from "lucide-react";
import {
  Network,
  NotebookPen,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TestTube2,
  Workflow,
} from "lucide-react";

export type ConnectedNoteNode = Readonly<{
  id: string;
  title: string;
  category?: string;
  size: "primary" | "secondary" | "tertiary";
  x: number;
  y: number;
  mobileHidden?: boolean;
}>;

export type ConnectedNoteEdge = Readonly<{
  from: string;
  to: string;
  strength?: "primary" | "secondary";
  curve?: number;
  mobileHidden?: boolean;
}>;

export type ConnectedNotesFeature = Readonly<{
  title: string;
  description: string;
  icon: LucideIcon;
}>;

export const connectedNotesCopy = {
  label: "Connected systems",
  heading: "Turn scattered ideas into a useful knowledge network.",
  headingLines: [
    "Turn scattered ideas into",
    "a useful knowledge network.",
  ],
  description:
    "Link projects, decisions, research, and technical notes so useful context stays connected and easy to recover.",
} as const;

export const connectedNoteNodes = [
  {
    id: "portfolio-system",
    title: "Portfolio system",
    category: "Core graph",
    size: "primary",
    x: 49,
    y: 49,
  },
  {
    id: "roadmap",
    title: "Product roadmap",
    category: "Planning",
    size: "secondary",
    x: 18,
    y: 23,
  },
  {
    id: "architecture",
    title: "System architecture",
    category: "Engineering",
    size: "secondary",
    x: 34,
    y: 17,
  },
  {
    id: "user-research",
    title: "User research",
    category: "Discovery",
    size: "secondary",
    x: 77,
    y: 24,
  },
  {
    id: "mobile-app",
    title: "Mobile app",
    category: "Experience",
    size: "secondary",
    x: 21,
    y: 69,
  },
  {
    id: "api-design",
    title: "API design",
    category: "Platform",
    size: "secondary",
    x: 74,
    y: 60,
  },
  {
    id: "security-model",
    title: "Security model",
    category: "Policy",
    size: "secondary",
    x: 62,
    y: 77,
  },
  {
    id: "ai-workflow",
    title: "AI workflow",
    category: "Automation",
    size: "tertiary",
    x: 61,
    y: 34,
    mobileHidden: true,
  },
  {
    id: "testing-notes",
    title: "Testing notes",
    category: "Quality",
    size: "tertiary",
    x: 39,
    y: 79,
    mobileHidden: true,
  },
  {
    id: "deployment-plan",
    title: "Deployment plan",
    category: "Delivery",
    size: "tertiary",
    x: 86,
    y: 46,
    mobileHidden: true,
  },
] as const satisfies readonly ConnectedNoteNode[];

export const connectedNoteEdges = [
  { from: "portfolio-system", to: "architecture", strength: "primary", curve: -12 },
  { from: "portfolio-system", to: "roadmap", strength: "primary", curve: -18 },
  { from: "portfolio-system", to: "user-research", strength: "primary", curve: 16 },
  { from: "portfolio-system", to: "mobile-app", strength: "primary", curve: 14 },
  { from: "portfolio-system", to: "api-design", strength: "primary", curve: -10 },
  { from: "portfolio-system", to: "security-model", strength: "secondary", curve: 18 },
  { from: "architecture", to: "api-design", strength: "secondary", curve: 14 },
  { from: "roadmap", to: "user-research", strength: "secondary", curve: 26, mobileHidden: true },
  { from: "mobile-app", to: "testing-notes", strength: "secondary", curve: 12, mobileHidden: true },
  { from: "security-model", to: "deployment-plan", strength: "secondary", curve: -16, mobileHidden: true },
  { from: "ai-workflow", to: "portfolio-system", strength: "secondary", curve: -10, mobileHidden: true },
  { from: "architecture", to: "ai-workflow", strength: "secondary", curve: 10, mobileHidden: true },
] as const satisfies readonly ConnectedNoteEdge[];

export const connectedNotesFeatures = [
  {
    title: "Connected project thinking",
    description:
      "Relate architecture decisions, implementation notes, and research through clear links.",
    icon: Network,
  },
  {
    title: "Frictionless knowledge capture",
    description:
      "Record useful context quickly before it disappears into forgotten tabs and chat history.",
    icon: NotebookPen,
  },
] as const satisfies readonly ConnectedNotesFeature[];

export const connectedNodeIcons: Record<string, LucideIcon> = {
  roadmap: Rocket,
  architecture: Workflow,
  "user-research": Sparkles,
  "mobile-app": Smartphone,
  "api-design": Workflow,
  "security-model": ShieldCheck,
  "ai-workflow": Sparkles,
  "testing-notes": TestTube2,
  "deployment-plan": Rocket,
  "portfolio-system": Network,
};
