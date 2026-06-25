import type { NavAction, NavItem } from "@/types/site";

import { NavLink } from "@/components/ui/nav-link";

type DesktopNavigationProps = {
  items: readonly NavItem[];
  actions: readonly NavAction[];
};

export function DesktopNavigation({ items, actions }: DesktopNavigationProps) {
  return (
    <>
      <nav
        aria-label="Primary"
        className="hidden justify-self-center rounded-full border border-border/80 bg-white/38 px-2.5 py-1 backdrop-blur-[10px] lg:block"
      >
        <ul className="flex items-center gap-1">
          {items.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href} label={item.label} />
            </li>
          ))}
        </ul>
      </nav>
      <div className="hidden items-center justify-end gap-3 lg:flex">
        {actions.map((action) => (
          <NavLink
            key={action.href}
            href={action.href}
            label={action.label}
            variant={
              action.kind === "primary" ? "primary-action" : "secondary-action"
            }
          />
        ))}
      </div>
    </>
  );
}
