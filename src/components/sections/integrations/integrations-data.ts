import type { LucideIcon } from "lucide-react";
import {
  CalendarRange,
  Highlighter,
  PanelsTopLeft,
  Workflow,
} from "lucide-react";

export type IntegrationItem = Readonly<{
  category: string;
  description: string;
  icon: LucideIcon;
  id: string;
  status: string;
  title: string;
}>;

export const integrationsCopy = {
  description:
    "Bring research, calendars, automation, and captured content into one workflow without making every system feel isolated.",
  heading: "Connect the tools behind the work.",
  headingLines: ["Connect the tools", "behind the work."],
  label: "Integrations",
} as const;

export const integrationItems = [
  {
    category: "Automation",
    description:
      "Connect routine project events to useful follow-up actions without repetitive manual work.",
    icon: Workflow,
    id: "workflow-automation",
    status: "Ready to connect",
    title: "Workflow automation",
  },
  {
    category: "Research",
    description:
      "Bring highlighted ideas and reading notes into the same knowledge workflow.",
    icon: Highlighter,
    id: "reading-highlights",
    status: "Synced context",
    title: "Reading highlights",
  },
  {
    category: "Scheduling",
    description:
      "Keep schedules, participants, and meeting context close to the work they support.",
    icon: CalendarRange,
    id: "calendar-contacts",
    status: "Connected workflow",
    title: "Calendar and contacts",
  },
  {
    category: "Capture",
    description:
      "Save useful references and technical material while researching across the web.",
    icon: PanelsTopLeft,
    id: "browser-capture",
    status: "Available",
    title: "Browser capture",
  },
] as const satisfies readonly IntegrationItem[];

export const integrationsHub = {
  label: "Project workspace",
  microcopy: "One workflow, fewer disconnected tools.",
  supportingText: "Connected context",
} as const;
