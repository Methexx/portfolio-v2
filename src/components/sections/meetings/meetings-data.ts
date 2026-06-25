import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck2,
  CalendarDays,
  CircleCheck,
  ClipboardList,
  FolderKanban,
  ListChecks,
  RefreshCw,
  Users,
} from "lucide-react";

export type CalendarAccount = Readonly<{
  icon: LucideIcon;
  id: string;
  identifier: string;
  label: string;
  mobileHidden?: boolean;
  provider: string;
  status: string;
  statusIcon: LucideIcon;
}>;

export type MeetingItem = Readonly<{
  category: string;
  duration: string;
  id: string;
  mobileHidden?: boolean;
  participantLabel?: string;
  selected?: boolean;
  time: string;
  title: string;
}>;

export type MeetingDetail = Readonly<{
  actions: readonly string[];
  agenda: readonly string[];
  dateLabel: string;
  duration: string;
  participants: readonly string[];
  preparation: readonly string[];
  projectContext: readonly string[];
  purpose: string;
  status: string;
  time: string;
  title: string;
  decisions: readonly string[];
}>;

export type MeetingFeature = Readonly<{
  description: string;
  icon: LucideIcon;
  title: string;
}>;

export const meetingsCopy = {
  description:
    "Keep schedules, preparation notes, decisions, and follow-up tasks together so important conversations remain useful after the call ends.",
  heading: "Turn every meeting into useful context.",
  headingLines: ["Turn every meeting", "into useful context."],
  label: "Meetings",
} as const;

export const calendarAccounts = [
  {
    icon: CalendarDays,
    id: "work-calendar",
    identifier: "work@portfolio.local",
    label: "Work calendar",
    mobileHidden: false,
    provider: "Calendar",
    status: "Connected",
    statusIcon: CircleCheck,
  },
  {
    icon: CalendarCheck2,
    id: "personal-calendar",
    identifier: "personal@portfolio.local",
    label: "Personal calendar",
    mobileHidden: false,
    provider: "Calendar",
    status: "Connected",
    statusIcon: CircleCheck,
  },
  {
    icon: RefreshCw,
    id: "project-calendar",
    identifier: "projects@portfolio.local",
    label: "Project calendar",
    mobileHidden: true,
    provider: "Schedule",
    status: "Synced",
    statusIcon: CircleCheck,
  },
] as const satisfies readonly CalendarAccount[];

export const agendaDateLabel = "Thursday, 25 June" as const;

export const meetingItems = [
  {
    category: "Product",
    duration: "45 min",
    id: "product-planning",
    mobileHidden: false,
    participantLabel: "PM",
    time: "9:00 AM",
    title: "Product planning",
  },
  {
    category: "Design",
    duration: "30 min",
    id: "mobile-experience-review",
    mobileHidden: false,
    participantLabel: "UX",
    time: "10:30 AM",
    title: "Mobile experience review",
  },
  {
    category: "Engineering",
    duration: "60 min",
    id: "architecture-discussion",
    mobileHidden: false,
    participantLabel: "3",
    selected: true,
    time: "1:00 PM",
    title: "Architecture discussion",
  },
  {
    category: "Research",
    duration: "45 min",
    id: "ai-workflow-review",
    mobileHidden: true,
    participantLabel: "AI",
    time: "3:00 PM",
    title: "AI workflow review",
  },
  {
    category: "Team",
    duration: "30 min",
    id: "weekly-wrap-up",
    mobileHidden: true,
    participantLabel: "5",
    time: "5:00 PM",
    title: "Weekly wrap-up",
  },
] as const satisfies readonly MeetingItem[];

export const selectedMeetingDetail = {
  actions: [
    "Prepare deployment checklist",
    "Document API ownership",
    "Schedule follow-up review",
  ],
  agenda: [
    "Review current architecture",
    "Resolve deployment risks",
    "Confirm ownership",
    "Define next milestone",
  ],
  dateLabel: "Thursday, 25 June",
  decisions: [
    "Keep services separated by responsibility",
    "Use staged deployment for the next release",
  ],
  duration: "60 min",
  participants: ["MP", "AD", "SK"],
  preparation: [
    "Review API boundary notes",
    "Compare deployment options",
    "Confirm mobile release dependency",
  ],
  projectContext: [
    "Security review notes",
    "Deployment readiness summary",
    "Mobile release checklist",
  ],
  purpose:
    "Review system boundaries, deployment decisions, and the next implementation milestone.",
  status: "Upcoming",
  time: "1:00 PM - 2:00 PM",
  title: "Architecture discussion",
} as const satisfies MeetingDetail;

export const meetingsFeatures = [
  {
    description:
      "Bring project context, open questions, and previous decisions into one clear agenda.",
    icon: ClipboardList,
    title: "Prepared before the meeting",
  },
  {
    description:
      "Keep decisions, notes, and follow-up actions connected to the work they affect.",
    icon: ListChecks,
    title: "Useful after the meeting",
  },
] as const satisfies readonly MeetingFeature[];

export const meetingsStats = {
  connectedCalendars: "3 calendars connected",
  lastSync: "Last sync: 2 minutes ago",
} as const;

export const meetingsPanelLabels = {
  accountsHeading: "Calendars",
  agendaHeading: "Today",
  linkedContextHeading: "Linked context",
  notesHeading: "Meeting notes",
  participantsHeading: "Participants",
  purposeHeading: "Meeting purpose",
  statusHeading: "Upcoming",
} as const;

export const meetingsDetailBadges = [
  {
    icon: FolderKanban,
    id: "milestone",
    label: "Next milestone",
  },
  {
    icon: Users,
    id: "owners",
    label: "Shared ownership",
  },
] as const;
