import { HelpCircle, Mic, Search } from "lucide-react";

import {
  PreviewSearchEntrance,
  PreviewSelectedNavAccent,
  PreviewSidebarFooterEntrance,
  PreviewSidebarGroup,
  PreviewSidebarItem,
} from "@/components/sections/hero/product-preview/product-preview-motion";
import {
  PreviewNavItem,
} from "@/components/sections/hero/product-preview/preview-nav-item";
import {
  previewNavItems,
  previewPinnedNotes,
  type PreviewWorkspaceState,
} from "@/components/sections/hero/product-preview/preview-placeholder-data";

type PreviewSidebarProps = {
  state?: PreviewWorkspaceState;
};

export function PreviewSidebar({ state }: PreviewSidebarProps) {
  return (
    <aside className="flex h-full min-h-0 flex-col bg-preview-sidebar px-2.5 py-3 text-white/72 sm:px-3 sm:py-4 md:px-4">
      <PreviewSearchEntrance className="flex items-center gap-2">
        <div className="flex min-h-9 flex-1 items-center gap-2 rounded-[0.95rem] border border-preview-border bg-white/[0.04] px-2.5 text-[0.66rem] text-white/42">
          <Search size={12} className="shrink-0" />
          <span className="truncate">Search anything...</span>
          <span className="ml-auto rounded-md border border-white/8 bg-white/[0.04] px-1.5 py-0.5 text-[0.52rem] text-white/36">
            ⌘K
          </span>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-[0.95rem] border border-preview-border bg-white/[0.04] text-white/42">
          <Mic size={12} />
        </div>
      </PreviewSearchEntrance>

      <PreviewSidebarGroup className="mt-4 grid gap-1.5">
        {previewNavItems.map((item) => (
          <PreviewSidebarItem key={item.label}>
            <PreviewSelectedNavAccent active={state ? state.activeNav === item.icon : item.active}>
              <PreviewNavItem
                item={item}
                active={state ? state.activeNav === item.icon : item.active}
              />
            </PreviewSelectedNavAccent>
          </PreviewSidebarItem>
        ))}
      </PreviewSidebarGroup>

      <PreviewSidebarGroup className="mt-5">
        <PreviewSidebarItem className="px-2.5 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-white/28">
          Pinned notes
        </PreviewSidebarItem>
        <div className="mt-2 grid gap-1">
          {previewPinnedNotes.slice(0, 5).map((note, index) => (
            <PreviewSidebarItem
              key={note.title}
              className={`rounded-xl px-2.5 py-2 text-[0.65rem] leading-4 transition duration-300 ease-[var(--ease-standard)] ${
                index > 2 ? "hidden md:block" : ""
              } ${
                state?.activePinned === note.title
                  ? "bg-white/[0.06] text-white/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  : "text-white/44"
              }`}
            >
              {note.title}
            </PreviewSidebarItem>
          ))}
        </div>
      </PreviewSidebarGroup>

      <PreviewSidebarFooterEntrance className="mt-auto">
        <div className="flex items-center justify-between gap-2 rounded-[1rem] border border-preview-border bg-white/[0.03] px-2.5 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-[radial-gradient(circle_at_top,_rgba(186,163,255,0.72),_rgba(109,61,245,0.92))]" />
          <div className="text-[0.66rem] leading-4">
            <div className="font-medium text-white/74">Designer</div>
            <div className="text-white/34">Workspace</div>
          </div>
        </div>
        <HelpCircle size={14} className="text-white/34" />
        </div>
      </PreviewSidebarFooterEntrance>
    </aside>
  );
}
