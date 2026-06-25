import { Highlighter } from "lucide-react";

import {
  readingHighlights,
  researchReadingCopy,
} from "@/components/sections/research-reading/research-reading-data";

export function ReadingHighlightsPanel() {
  return (
    <div className="rounded-[1.7rem] border border-research-border bg-research-panel p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-full border border-primary/12 bg-primary/[0.05] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary">
          {researchReadingCopy.readingSource}
        </div>
        <p className="max-w-none text-[0.8rem] font-medium tracking-[0.08em] text-muted uppercase">
          {researchReadingCopy.readingMeta}
        </p>
      </div>

      <h3 className="mt-5 text-[1.45rem] font-medium tracking-[-0.045em] text-foreground sm:text-[1.7rem]">
        {researchReadingCopy.readingTitle}
      </h3>

      <div className="mt-5 space-y-4 text-[0.98rem] leading-7 text-foreground/82">
        {researchReadingCopy.readingBody.map((paragraph) => (
          <p key={paragraph} className="max-w-none">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {readingHighlights.slice(0, 3).map((highlight) => (
          <div
            key={highlight.id}
            className="rounded-[1.2rem] border border-primary/10 bg-research-highlight px-4 py-3"
          >
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.9rem] border border-primary/12 bg-white/70 text-primary">
                <Highlighter aria-hidden="true" className="size-4" strokeWidth={1.85} />
              </div>
              <div>
                <p className="max-w-none text-[0.95rem] font-medium leading-6 text-foreground/88">
                  {highlight.excerpt}
                </p>
                {highlight.location ? (
                  <p className="mt-2 max-w-none text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-muted">
                    {highlight.location}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {["architecture", "research", "highlights"].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border/80 bg-white/72 px-3 py-1 text-[0.76rem] font-medium text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
