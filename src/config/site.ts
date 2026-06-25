import type {
  NavAction,
  NavItem,
  SiteConfig,
  SocialLinks,
} from "@/types/site";

const socialLinks = {
  github: "https://github.com/placeholder",
  linkedin: "https://www.linkedin.com/in/placeholder",
  x: "https://x.com/placeholder",
} as const satisfies SocialLinks;

const mainNavigation = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Notes", href: "#notes" },
] as const satisfies readonly NavItem[];

const actionNavigation = [
  { label: "Contact", href: "#contact", kind: "secondary" },
  { label: "View resume", href: "#resume", kind: "primary" },
] as const satisfies readonly NavAction[];

export const siteConfig = {
  name: "Portfolio",
  shortName: "Portfolio",
  description: "A motion-focused software engineering portfolio.",
  url: "https://example.com",
  email: "hello@example.com",
  socialLinks,
  navigation: {
    main: mainNavigation,
    actions: actionNavigation,
  },
} as const satisfies SiteConfig;
