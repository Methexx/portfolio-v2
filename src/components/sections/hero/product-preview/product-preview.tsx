import {
  PreviewEditorEntrance,
  PreviewInspectorEntrance,
  PreviewSidebarEntrance,
} from "@/components/sections/hero/product-preview/product-preview-motion";
import { ProductPreviewActivity } from "@/components/sections/hero/product-preview/product-preview-activity";
import { PreviewEditor } from "@/components/sections/hero/product-preview/preview-editor";
import { PreviewInspector } from "@/components/sections/hero/product-preview/preview-inspector";
import { PreviewShell } from "@/components/sections/hero/product-preview/preview-shell";
import { PreviewSidebar } from "@/components/sections/hero/product-preview/preview-sidebar";

export function ProductPreview() {
  return (
    <PreviewShell aria-hidden="true">
      <ProductPreviewActivity active />
      <div className="absolute inset-x-0 top-0 flex h-10 items-center justify-between border-b border-preview-border bg-white/[0.03] px-4 sm:h-11 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/22" />
          <span className="h-2 w-2 rounded-full bg-white/14" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
        </div>
        <div className="h-2 w-24 rounded-full bg-white/8 sm:w-32" />
      </div>

      <div className="grid h-full grid-cols-[5.3rem_minmax(0,1fr)] pt-10 sm:grid-cols-[7.25rem_minmax(0,1fr)] sm:pt-11 md:grid-cols-[25%_48%_27%] lg:grid-cols-[26%_48%_26%]">
        <PreviewSidebarEntrance className="h-full min-h-0">
          <PreviewSidebar />
        </PreviewSidebarEntrance>
        <PreviewEditorEntrance className="h-full min-h-0">
          <PreviewEditor />
        </PreviewEditorEntrance>
        <PreviewInspectorEntrance className="hidden h-full min-h-0 md:flex">
          <PreviewInspector />
        </PreviewInspectorEntrance>
      </div>
    </PreviewShell>
  );
}
