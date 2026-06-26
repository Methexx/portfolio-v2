import type { ReactNode } from "react";

import {
  PreviewDocumentGroup,
  PreviewDocumentGroups,
  PreviewTitleEntrance,
  PreviewTitleIndicator,
} from "@/components/sections/hero/product-preview/product-preview-motion";
import {
  previewDocumentSections,
  type PreviewWorkspaceState,
} from "@/components/sections/hero/product-preview/preview-placeholder-data";

function Highlight({ children }: { children: ReactNode }) {
  return <span className="text-primary-bright">{children}</span>;
}

function renderSentence(title: string, highlights: readonly string[] = []) {
  if (highlights.length === 0) {
    return title;
  }

  let remaining = title;
  const content: ReactNode[] = [];

  highlights.forEach((highlight, index) => {
    const position = remaining.indexOf(highlight);

    if (position === -1) {
      return;
    }

    const before = remaining.slice(0, position);
    const after = remaining.slice(position + highlight.length);

    if (before) {
      content.push(before);
    }

    content.push(<Highlight key={`${highlight}-${index}`}>{highlight}</Highlight>);
    remaining = after;
  });

  if (remaining) {
    content.push(remaining);
  }

  return content;
}

type PreviewEditorProps = {
  state?: PreviewWorkspaceState;
};

export function PreviewEditor({ state }: PreviewEditorProps) {
  const activeSection =
    previewDocumentSections.find((section) => section.title === state?.title) ??
    previewDocumentSections[0];

  return (
    <section className="flex h-full min-h-0 flex-col bg-preview-editor px-4 py-4 text-white/72 sm:px-5 sm:py-5 md:px-6 lg:px-7">
      <PreviewTitleEntrance className="flex items-center gap-3">
        <PreviewTitleIndicator className="flex">
          <span className="h-8 w-0.5 rounded-full bg-primary" />
        </PreviewTitleIndicator>
        <div className="min-w-0">
          <div className="text-[0.6rem] uppercase tracking-[0.14em] text-white/26">
            Editor
          </div>
          <h2 className="mt-1 text-[0.9rem] font-medium tracking-[-0.02em] text-white/86 sm:text-[0.95rem]">
            {`Sun, April ${state?.selectedDay ?? "2"}th, 2023`}
          </h2>
        </div>
      </PreviewTitleEntrance>

      <div className="mt-6 min-h-0 flex-1">
        <PreviewDocumentGroups className="space-y-4 text-[0.72rem] leading-[1.72] sm:text-[0.76rem] md:text-[0.8rem]">
          <PreviewDocumentGroup key={activeSection.title}>
              <div className="flex gap-2.5">
                <span className="mt-[0.48rem] h-1.5 w-1.5 rounded-full bg-primary-bright shadow-[0_0_0_4px_rgba(139,92,246,0.14)]" />
                <div className="min-w-0">
                  <p className="text-white/92">
                    {renderSentence(activeSection.title, activeSection.highlights)}
                  </p>
                  {activeSection.children ? (
                    <ul className="mt-2.5 space-y-2.5 border-l border-white/10 pl-4 text-white/56">
                      {activeSection.children.map((child, index) => (
                        <li
                          key={child.title}
                          className="flex gap-2.5 transition duration-300 ease-[var(--ease-standard)]"
                        >
                          <span
                            className={`mt-[0.48rem] h-1.5 w-1.5 rounded-full ${
                              index === 0 ? "bg-primary/80" : "bg-white/24"
                            }`}
                          />
                          <span className={index === 0 ? "text-white/82" : undefined}>
                            {renderSentence(child.title, child.highlights)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
          </PreviewDocumentGroup>
        </PreviewDocumentGroups>

        <div className="mt-5 rounded-[1.05rem] border border-white/8 bg-white/[0.03] px-3 py-3 text-[0.64rem] font-medium uppercase tracking-[0.14em] text-white/42">
          Active workspace thread
        </div>
      </div>
    </section>
  );
}
