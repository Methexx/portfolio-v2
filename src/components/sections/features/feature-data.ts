import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  BrainCircuit,
  CloudCog,
  Database,
  Gauge,
  Layers3,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export type Feature = Readonly<{
  title: string;
  description: string;
  icon: LucideIcon;
}>;

export const featureItems = [
  {
    title: "Product engineering",
    description: "Build polished digital products from concept to production.",
    icon: Boxes,
  },
  {
    title: "Full-stack systems",
    description: "Create reliable web platforms across frontend, backend, and data.",
    icon: Layers3,
  },
  {
    title: "Mobile applications",
    description: "Design responsive mobile experiences for real-world workflows.",
    icon: Smartphone,
  },
  {
    title: "Secure architecture",
    description: "Protect users and systems with thoughtful security foundations.",
    icon: ShieldCheck,
  },
  {
    title: "Database design",
    description: "Model structured, scalable data for complex applications.",
    icon: Database,
  },
  {
    title: "AI integration",
    description: "Add useful intelligence without turning products into gimmicks.",
    icon: BrainCircuit,
  },
  {
    title: "Cloud deployment",
    description: "Ship dependable applications with practical deployment workflows.",
    icon: CloudCog,
  },
  {
    title: "Performance optimization",
    description: "Keep interfaces fast, responsive, and efficient across devices.",
    icon: Gauge,
  },
] as const satisfies readonly Feature[];
