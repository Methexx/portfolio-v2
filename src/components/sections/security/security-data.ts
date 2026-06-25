import type { LucideIcon } from "lucide-react";
import {
  Database,
  FileText,
  Fingerprint,
  FolderOpen,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  User,
} from "lucide-react";

export type SecurityDataItem = Readonly<{
  emphasis?: boolean;
  icon: LucideIcon;
  id: string;
  maskedValue: string;
  status: string;
  title: string;
}>;

export type SecurityAccessItem = Readonly<{
  icon: LucideIcon;
  id: string;
  label: string;
  status: string;
}>;

export type SecurityFeature = Readonly<{
  description: string;
  icon: LucideIcon;
  title: string;
}>;

export const securityCopy = {
  description:
    "Sensitive information should remain private by design, with secure boundaries, controlled access, and data protection built into the architecture.",
  heading: "Protect every layer of the system.",
  headingLines: ["Protect every layer", "of the system."],
  label: "Security",
} as const;

export const securityCipherLines = [
  "a7F9k2Qp1x 4Lr8Vt0m5H",
  "Q4n7Zc8r2Wk9 s1Lm5Pq",
  "v8K2mR5xL1p0 H3q9Tn6cW7",
  "Y2p8Dk4rQ1 m7Ls9Vc3N0 z5Hf2",
] as const;

export const securityDataItems = [
  {
    emphasis: true,
    icon: User,
    id: "user-profile",
    maskedValue: "**************",
    status: "Encrypted",
    title: "User profile",
  },
  {
    icon: FolderOpen,
    id: "project-records",
    maskedValue: "************",
    status: "Encrypted",
    title: "Project records",
  },
  {
    icon: FileText,
    id: "private-notes",
    maskedValue: "****************",
    status: "Encrypted",
    title: "Private notes",
  },
  {
    icon: KeyRound,
    id: "session-data",
    maskedValue: "*************",
    status: "Scoped",
    title: "Session data",
  },
] as const satisfies readonly SecurityDataItem[];

export const securityAccessItems = [
  {
    icon: Fingerprint,
    id: "identity",
    label: "Identity verified",
    status: "Verified",
  },
  {
    icon: ShieldCheck,
    id: "permissions",
    label: "Role permissions",
    status: "Scoped",
  },
  {
    icon: Database,
    id: "ownership",
    label: "Data ownership",
    status: "Private",
  },
  {
    icon: LockKeyhole,
    id: "audit",
    label: "Audit history",
    status: "Recorded",
  },
] as const satisfies readonly SecurityAccessItem[];

export const securityCoreTags = ["Protected", "Verified", "Private"] as const;

export const securityFeatures = [
  {
    description:
      "Keep sensitive data protected through clear access controls and secure storage patterns.",
    icon: ShieldCheck,
    title: "Private by default",
  },
  {
    description:
      "Make permissions, data ownership, and system responsibilities understandable and auditable.",
    icon: Fingerprint,
    title: "Transparent security boundaries",
  },
] as const satisfies readonly SecurityFeature[];
