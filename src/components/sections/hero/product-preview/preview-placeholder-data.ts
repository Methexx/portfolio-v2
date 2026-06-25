export type PreviewNavItem = Readonly<{
  icon: "daily" | "notes" | "tasks" | "map";
  label: string;
  active?: boolean;
}>;

export type PreviewPinnedNote = Readonly<{
  title: string;
}>;

export type PreviewMeeting = Readonly<{
  title: string;
  time: string;
}>;

export type PreviewCalendarDay = Readonly<{
  day: string;
  muted?: boolean;
  selected?: boolean;
}>;

export type PreviewDocumentSection = Readonly<{
  title: string;
  highlights?: readonly string[];
  children?: readonly PreviewDocumentSection[];
}>;

export type PreviewActionItem = Readonly<{
  icon: "pin" | "link" | "history";
  label: string;
}>;

export const previewNavItems: readonly PreviewNavItem[] = [
  { icon: "daily", label: "Daily notes", active: true },
  { icon: "notes", label: "All notes" },
  { icon: "tasks", label: "Tasks" },
  { icon: "map", label: "Map" },
] as const;

export const previewPinnedNotes: readonly PreviewPinnedNote[] = [
  { title: "Product thinking" },
  { title: "Interface systems" },
  { title: "Motion studies" },
  { title: "Research notes" },
  { title: "Ideas and drafts" },
] as const;

export const previewDocumentSections: readonly PreviewDocumentSection[] = [
  {
    title: "Today I explored a new product direction",
    children: [
      { title: "What makes an interface feel effortless?" },
      { title: "Reduce friction in the primary workflow" },
      {
        title: "Use motion only when it improves understanding",
        highlights: ["motion", "understanding"],
      },
      { title: "Keep visual hierarchy consistent" },
    ],
  },
  {
    title: "What should I document?",
    children: [
      { title: "Architecture decisions", highlights: ["Architecture"] },
      { title: "Meeting notes" },
      { title: "Design experiments", highlights: ["Design"] },
      { title: "Research findings" },
    ],
  },
  {
    title: "A few principles",
    children: [
      { title: "Clarity before decoration" },
      { title: "Performance before spectacle", highlights: ["Performance"] },
      {
        title: "Accessibility from the beginning",
        highlights: ["Accessibility"],
      },
    ],
  },
] as const;

export const previewActions: readonly PreviewActionItem[] = [
  { icon: "pin", label: "Pin this note" },
  { icon: "link", label: "Share private link" },
  { icon: "history", label: "Show history" },
] as const;

export const previewMeetings: readonly PreviewMeeting[] = [
  { title: "Design review", time: "5:00am" },
  { title: "Product planning", time: "7:00am" },
  { title: "Engineering sync", time: "12:00pm" },
] as const;

export const previewCalendarWeekdays = [
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa",
  "Su",
] as const;

export const previewCalendarDays: readonly PreviewCalendarDay[] = [
  { day: "27", muted: true },
  { day: "28", muted: true },
  { day: "29", muted: true },
  { day: "30", muted: true },
  { day: "31", muted: true },
  { day: "1" },
  { day: "2", selected: true },
  { day: "3" },
  { day: "4" },
  { day: "5" },
  { day: "6" },
  { day: "7" },
  { day: "8" },
  { day: "9" },
  { day: "10" },
  { day: "11" },
  { day: "12" },
  { day: "13" },
  { day: "14" },
  { day: "15" },
  { day: "16" },
  { day: "17" },
  { day: "18" },
  { day: "19" },
  { day: "20" },
  { day: "21" },
  { day: "22" },
  { day: "23" },
  { day: "24" },
  { day: "25" },
  { day: "26" },
  { day: "27" },
  { day: "28" },
  { day: "29" },
  { day: "30" },
] as const;
