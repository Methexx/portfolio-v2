import { Database, Fingerprint, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";

import {
  securityAccessItems,
  securityCoreTags,
  securityDataItems,
} from "@/components/sections/security/security-data";
import { SecurityDataCard } from "@/components/sections/security/security-data-card";

export function SecurityVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative mt-14 overflow-hidden rounded-[2.5rem] border border-security-border bg-[radial-gradient(circle_at_top,rgba(109,61,245,0.18),transparent_26%),radial-gradient(circle_at_78%_22%,rgba(157,125,255,0.12),transparent_22%),linear-gradient(180deg,#1b1327_0%,#150f1f_100%)] p-4 shadow-[0_30px_80px_-40px_rgba(24,12,36,0.7),inset_0_1px_0_rgba(255,255,255,0.05)] sm:mt-16 sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:2.75rem_2.75rem] opacity-25" />

      <div className="relative grid gap-5 lg:min-h-[38rem] lg:grid-cols-[0.3fr_0.4fr_0.3fr]">
        <div className="order-2 space-y-3 lg:order-1">
          <div className="rounded-[1.4rem] border border-security-border bg-security-panel px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <p className="max-w-none text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-security-status">
              Encrypted records
            </p>
          </div>
          {securityDataItems.map((item) => (
            <SecurityDataCard key={item.id} item={item} />
          ))}
        </div>

        <div className="order-1 flex items-center lg:order-2">
          <div className="relative flex min-h-[24rem] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-security-border bg-[radial-gradient(circle_at_center,rgba(109,61,245,0.16),transparent_32%),linear-gradient(180deg,rgba(34,24,48,0.94),rgba(21,15,31,0.94))] px-6 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:min-h-[28rem]">
            <svg
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 45 Q 18 40 32 50"
                fill="none"
                stroke="rgba(194,178,255,0.22)"
                strokeWidth="1"
              />
              <path
                d="M 68 50 Q 82 40 100 45"
                fill="none"
                stroke="rgba(194,178,255,0.22)"
                strokeWidth="1"
              />
              <path
                d="M 0 60 Q 18 58 32 52"
                fill="none"
                stroke="rgba(194,178,255,0.14)"
                strokeWidth="0.8"
              />
              <path
                d="M 68 52 Q 82 58 100 60"
                fill="none"
                stroke="rgba(194,178,255,0.14)"
                strokeWidth="0.8"
              />
            </svg>

            <div className="relative flex flex-col items-center text-center">
              <div className="absolute h-[15.5rem] w-[15.5rem] rounded-full border border-primary/16 sm:h-[18rem] sm:w-[18rem]" />
              <div className="absolute h-[12.5rem] w-[12.5rem] rounded-full border border-primary/18 sm:h-[14.5rem] sm:w-[14.5rem]" />
              <div className="absolute h-[9rem] w-[9rem] rounded-full border border-primary/20 sm:h-[10.5rem] sm:w-[10.5rem]" />

              <div className="relative flex h-[8.5rem] w-[8.5rem] items-center justify-center rounded-[2rem] border border-primary/16 bg-[radial-gradient(circle_at_top,rgba(157,125,255,0.22),transparent_56%),rgba(30,21,44,0.96)] shadow-[0_16px_40px_-30px_rgba(157,125,255,0.65)] sm:h-[10rem] sm:w-[10rem]">
                <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full border border-security-border bg-security-panel text-security-accent">
                  <KeyRound aria-hidden="true" className="size-4.5" strokeWidth={1.9} />
                </div>
                <LockKeyhole aria-hidden="true" className="size-10 text-primary-soft sm:size-12" strokeWidth={1.75} />
              </div>

              <div className="relative mt-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/16 bg-primary/[0.08] px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-security-status">
                  <ShieldCheck aria-hidden="true" className="size-4" strokeWidth={1.8} />
                  <span>Protected core</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {securityCoreTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[0.74rem] font-medium text-white/78"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid w-full max-w-[18rem] grid-cols-3 gap-3">
                <div className="rounded-[1rem] border border-security-border bg-white/[0.03] px-3 py-3">
                  <Fingerprint aria-hidden="true" className="mx-auto size-4.5 text-security-accent" strokeWidth={1.8} />
                </div>
                <div className="rounded-[1rem] border border-security-border bg-white/[0.03] px-3 py-3">
                  <Database aria-hidden="true" className="mx-auto size-4.5 text-security-accent" strokeWidth={1.8} />
                </div>
                <div className="rounded-[1rem] border border-security-border bg-white/[0.03] px-3 py-3">
                  <ShieldCheck aria-hidden="true" className="mx-auto size-4.5 text-security-accent" strokeWidth={1.8} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-3 space-y-4">
          <div className="rounded-[1.5rem] border border-security-border bg-security-panel px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-5">
            <p className="max-w-none text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-security-status">
              Access layers
            </p>
            <div className="mt-4 divide-y divide-white/6">
              {securityAccessItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[0.95rem] border border-primary/14 bg-primary/[0.08] text-security-accent">
                        <Icon aria-hidden="true" className="size-4.5" strokeWidth={1.8} />
                      </div>
                      <span className="text-[0.95rem] font-medium text-white">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-[0.76rem] font-medium uppercase tracking-[0.14em] text-security-status">
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.5rem] border border-security-border bg-security-panel px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-5">
              <p className="max-w-none text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-security-status">
                Secure boundary
              </p>
              <p className="mt-3 max-w-none text-[1rem] leading-7 text-white/78">
                Protected data stays isolated behind explicit ownership and scoped access checks.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-security-border bg-security-panel px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-5">
              <p className="max-w-none text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-security-status">
                Verification path
              </p>
              <p className="mt-3 max-w-none text-[1rem] leading-7 text-white/78">
                Identity, storage, and audit layers remain legible so trust boundaries are easier to inspect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
