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
  ambientLabel: string;
  title: string;
  description: string;
  icon: LucideIcon;
  id: string;
}>;

export const featureItems = [
  {
    id: "product-engineering",
    ambientLabel: "active scope",
    title: "Product engineering",
    description: "Build polished digital products from concept to production.",
    icon: Boxes,
  },
  {
    id: "full-stack-systems",
    ambientLabel: "data linked",
    title: "Full-stack systems",
    description: "Create reliable web platforms across frontend, backend, and data.",
    icon: Layers3,
  },
  {
    id: "mobile-applications",
    ambientLabel: "interface synced",
    title: "Mobile applications",
    description: "Design responsive mobile experiences for real-world workflows.",
    icon: Smartphone,
  },
  {
    id: "secure-architecture",
    ambientLabel: "policy checked",
    title: "Secure architecture",
    description: "Protect users and systems with thoughtful security foundations.",
    icon: ShieldCheck,
  },
  {
    id: "database-design",
    ambientLabel: "schema updated",
    title: "Database design",
    description: "Model structured, scalable data for complex applications.",
    icon: Database,
  },
  {
    id: "ai-integration",
    ambientLabel: "assistant ready",
    title: "AI integration",
    description: "Add useful intelligence without turning products into gimmicks.",
    icon: BrainCircuit,
  },
  {
    id: "cloud-deployment",
    ambientLabel: "deploy live",
    title: "Cloud deployment",
    description: "Ship dependable applications with practical deployment workflows.",
    icon: CloudCog,
  },
  {
    id: "performance-optimization",
    ambientLabel: "latency reduced",
    title: "Performance optimization",
    description: "Keep interfaces fast, responsive, and efficient across devices.",
    icon: Gauge,
  },
] as const satisfies readonly Feature[];
