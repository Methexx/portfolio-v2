import type { LucideIcon } from "lucide-react";
import {
  ArchiveRestore,
  BookOpen,
  Bookmark,
  Download,
  FileText,
  Globe2,
  Link2,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";

export type ResearchSource = Readonly<{
  id: string;
  title: string;
  type: string;
  tag?: string;
  icon: LucideIcon;
  mobileHidden?: boolean;
}>;

export type ReadingHighlight = Readonly<{
  id: string;
  excerpt: string;
  location?: string;
}>;

export type DeviceSyncItem = Readonly<{
  id: string;
  label: string;
  status: string;
  icon: LucideIcon;
}>;

export type ResearchFeature = Readonly<{
  title: string;
  description: string;
  icon: LucideIcon;
}>;

export const researchReadingCopy = {
  label: "Research and reading",
  heading: "Keep useful information within reach.",
  headingLines: ["Keep useful information", "within reach."],
  description:
    "Capture articles, technical references, research notes, and highlighted ideas in one structured place, then recover them when the work needs them.",
  sourcesHeading: "Saved research",
  readingTitle: "Building maintainable software systems",
  readingSource: "Reference summary",
  readingMeta: "Saved from architecture review",
  readingBody: [
    "Maintainable systems are shaped by clear boundaries, predictable data flow, and decisions that remain understandable months later.",
    "Captured research becomes more useful when important lines, implementation notes, and related links stay close to the project they support.",
  ],
  syncHeading: "Available everywhere",
} as const;

export const researchSources = [
  {
    id: "reliable-interfaces",
    title: "Designing reliable interfaces",
    type: "Article",
    tag: "Saved",
    icon: Globe2,
  },
  {
    id: "ai-architecture",
    title: "Practical AI architecture",
    type: "Documentation",
    tag: "Reference",
    icon: FileText,
  },
  {
    id: "mobile-patterns",
    title: "Mobile workflow patterns",
    type: "Research",
    tag: "Capture",
    icon: BookOpen,
  },
  {
    id: "database-notes",
    title: "Database performance notes",
    type: "Reference",
    tag: "Indexed",
    icon: Bookmark,
  },
  {
    id: "secure-api",
    title: "Secure API design",
    type: "Documentation",
    tag: "Synced",
    icon: Link2,
    mobileHidden: true,
  },
  {
    id: "deployment-checklist",
    title: "Deployment checklist",
    type: "Highlight",
    tag: "Recent",
    icon: FileText,
    mobileHidden: true,
  },
] as const satisfies readonly ResearchSource[];

export const readingHighlights = [
  {
    id: "highlight-1",
    excerpt:
      "Clear interfaces reduce coordination overhead when teams revisit the same system months later.",
    location: "Section 02",
  },
  {
    id: "highlight-2",
    excerpt:
      "Saved references become more valuable when highlights connect directly to implementation notes.",
    location: "Section 04",
  },
  {
    id: "highlight-3",
    excerpt:
      "Structured research capture makes later decisions faster because important context stays recoverable.",
    location: "Section 06",
  },
  {
    id: "highlight-4",
    excerpt:
      "Reusable tags and portable formats keep useful information available outside any single tool.",
    location: "Appendix",
  },
] as const satisfies readonly ReadingHighlight[];

export const deviceSyncItems = [
  { id: "desktop", label: "Desktop", status: "Synced", icon: Monitor },
  { id: "mobile", label: "Mobile", status: "Synced", icon: Smartphone },
  { id: "tablet", label: "Tablet", status: "Synced", icon: Tablet },
  { id: "browser", label: "Browser", status: "Synced", icon: Globe2 },
] as const satisfies readonly DeviceSyncItem[];

export const researchStats = [
  { id: "sources", label: "12 sources" },
  { id: "highlights", label: "8 highlights" },
  { id: "notes", label: "4 linked notes" },
] as const;

export const recentCaptureActivity = [
  { id: "saved-article", label: "Saved article", time: "Just now" },
  { id: "added-highlight", label: "Added highlight", time: "12 min" },
  { id: "linked-note", label: "Linked research note", time: "Today" },
] as const;

export const researchReadingFeatures = [
  {
    title: "Available across devices",
    description:
      "Keep project knowledge synchronized across desktop, tablet, and mobile workflows.",
    icon: Smartphone,
  },
  {
    title: "Portable and accessible",
    description:
      "Store information in formats that remain searchable, reusable, and easy to export.",
    icon: ArchiveRestore,
  },
] as const satisfies readonly ResearchFeature[];

export const exportIndicators = [
  { id: "markdown", label: "Markdown" },
  { id: "json", label: "JSON" },
  { id: "export", label: "Export ready", icon: Download },
] as const;
