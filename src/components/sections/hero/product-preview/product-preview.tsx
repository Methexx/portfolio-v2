import { PreviewEditor } from "@/components/sections/hero/product-preview/preview-editor";
import { PreviewInspector } from "@/components/sections/hero/product-preview/preview-inspector";
import { PreviewSidebar } from "@/components/sections/hero/product-preview/preview-sidebar";

export function ProductPreview() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-[1.38/1] min-h-[21.5rem] w-full max-w-[78rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(50,36,69,0.96),rgba(24,17,34,0.98))] shadow-[0_26px_60px_-36px_rgba(10,6,18,0.92)] sm:aspect-[1.5/1] sm:min-h-[28rem] md:aspect-[1.58/1] md:min-h-[33rem] lg:aspect-[1.68/1] lg:min-h-[39rem]"
    >
      <div className="absolute inset-x-0 top-0 flex h-10 items-center justify-between border-b border-preview-border bg-white/[0.03] px-4 sm:h-11 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/22" />
          <span className="h-2 w-2 rounded-full bg-white/14" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
        </div>
        <div className="h-2 w-24 rounded-full bg-white/8 sm:w-32" />
      </div>

      <div className="grid h-full grid-cols-[5.3rem_minmax(0,1fr)] pt-10 sm:grid-cols-[7.25rem_minmax(0,1fr)] sm:pt-11 md:grid-cols-[25%_48%_27%] lg:grid-cols-[26%_48%_26%]">
        <PreviewSidebar />
        <PreviewEditor />
        <PreviewInspector />
      </div>
    </div>
  );
}
