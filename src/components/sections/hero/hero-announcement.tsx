export function HeroAnnouncement() {
  return (
    <div className="inline-flex min-h-9 items-center gap-2 rounded-full border border-primary/14 bg-primary-soft/70 px-4 py-2 text-sm font-medium text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
      <span
        aria-hidden="true"
        className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_0_4px_rgba(109,61,245,0.12)]"
      />
      <span>Building thoughtful digital products</span>
    </div>
  );
}
