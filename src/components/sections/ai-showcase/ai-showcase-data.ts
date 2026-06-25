import type { LucideIcon } from "lucide-react";
import {
  ClipboardCheck,
  Copy,
  CornerDownLeft,
  FileText,
  ListChecks,
  RefreshCw,
  Sparkles,
  WandSparkles,
  Workflow,
} from "lucide-react";

export type AiAction = Readonly<{
  id: "rerun" | "insert" | "copy" | "replace";
  label: string;
  shortcut: string;
  icon: LucideIcon;
}>;

export type AiCapability = Readonly<{
  label: string;
  icon: LucideIcon;
}>;

export const aiShowcaseCopy = {
  label: "AI systems",
  heading: "Build with an intelligent assistant.",
  headingLines: ["Build with an", "intelligent assistant."],
  description:
    "Use carefully designed AI workflows to organize ideas, improve writing, and turn scattered information into useful output.",
  promptContextLabel: "Project notes",
  promptHeading: "How can AI improve the way software teams work?",
  promptSupportingLines: [
    "Turn architecture notes, decisions, and open questions into a more usable working summary.",
    "Keep the workflow grounded in product context instead of generic output.",
  ],
  promptPlaceholder: "Ask anything about the project...",
  customActionLabel: "Custom",
  customActionText: "Summarize the architecture and suggest the next steps",
  customActionShortcut: "Ctrl K",
  responseLabel: "Assistant response",
  responseText:
    "AI can reduce repetitive work, surface useful context, and help teams move from raw information to clearer decisions. The strongest results come from combining reliable product design, structured data, and human review.",
  responseChunks: [
    "AI can reduce repetitive work, surface useful context, and help teams move from raw information to clearer decisions.",
    "The strongest results come from combining reliable product design,",
    "structured data, and human review.",
  ],
  responseHighlight:
    "The strongest results come from combining reliable product design, structured data, and human review.",
  capabilitiesHeading: "What can intelligent systems help with?",
} as const;

export const aiActions = [
  { id: "rerun", label: "Re-run", shortcut: "R", icon: RefreshCw },
  { id: "insert", label: "Insert", shortcut: "I", icon: CornerDownLeft },
  { id: "copy", label: "Copy", shortcut: "C", icon: Copy },
] as const satisfies readonly AiAction[];

export const aiSecondaryActions = [
  { id: "replace", label: "Replace", shortcut: "Cmd Enter", icon: ClipboardCheck },
] as const satisfies readonly AiAction[];

export const aiCapabilities = [
  { label: "Summarize complex project information", icon: FileText },
  { label: "Generate structured implementation plans", icon: ListChecks },
  { label: "Extract key decisions and action items", icon: ClipboardCheck },
  { label: "Improve technical writing and documentation", icon: WandSparkles },
  { label: "Support reusable custom workflows", icon: Workflow },
] as const satisfies readonly AiCapability[];

export const aiPromptIcon = Sparkles;
