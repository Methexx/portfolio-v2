import type { ReactNode } from "react";

import {
  PreviewDocumentGroup,
  PreviewDocumentGroups,
  PreviewTitleEntrance,
  PreviewTitleIndicator,
} from "@/components/sections/hero/product-preview/product-preview-motion";
import { previewDocumentSections } from "@/components/sections/hero/product-preview/preview-placeholder-data";

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

export function PreviewEditor() {
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
            Sun, April 2nd, 2023
          </h2>
        </div>
      </PreviewTitleEntrance>

      <div className="mt-6 min-h-0 flex-1">
        <PreviewDocumentGroups className="space-y-4 text-[0.72rem] leading-[1.72] sm:text-[0.76rem] md:text-[0.8rem]">
          {previewDocumentSections.map((section) => (
            <PreviewDocumentGroup key={section.title}>
              <div className="flex gap-2.5">
                <span className="mt-[0.48rem] h-1.5 w-1.5 rounded-full bg-white/62" />
                <div className="min-w-0">
                  <p className="text-white/84">
                    {renderSentence(section.title, section.highlights)}
                  </p>
                  {section.children ? (
                    <ul className="mt-2.5 space-y-2.5 border-l border-white/8 pl-4 text-white/56">
                      {section.children.map((child) => (
                        <li key={child.title} className="flex gap-2.5">
                          <span className="mt-[0.48rem] h-1.5 w-1.5 rounded-full bg-white/24" />
                          <span>{renderSentence(child.title, child.highlights)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </PreviewDocumentGroup>
          ))}
        </PreviewDocumentGroups>
      </div>
    </section>
  );
}
