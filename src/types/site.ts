export type SocialLinks = Readonly<{
  github: string;
  linkedin: string;
  x: string;
}>;

export type NavItem = Readonly<{
  label: string;
  href: string;
}>;

export type NavAction = Readonly<{
  label: string;
  href: string;
  kind: "secondary" | "primary";
}>;

export type SiteConfig = Readonly<{
  name: string;
  shortName: string;
  description: string;
  url: string;
  email: string;
  socialLinks: SocialLinks;
  navigation: Readonly<{
    main: readonly NavItem[];
    actions: readonly NavAction[];
  }>;
}>;
