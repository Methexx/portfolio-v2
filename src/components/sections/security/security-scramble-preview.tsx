import { securityCipherLines } from "@/components/sections/security/security-data";
import { cn } from "@/lib/cn";

type SecurityScramblePreviewProps = {
  className?: string;
  lines?: readonly string[];
};

export function SecurityScramblePreview({
  className,
  lines = securityCipherLines,
}: SecurityScramblePreviewProps) {
  return (
    <div aria-hidden="true" className={cn("mx-auto max-w-[44rem] text-center", className)}>
      <div className="space-y-2 font-mono text-[0.82rem] tracking-[0.3em] text-security-ciphertext sm:text-[0.9rem]">
        {lines.map((line) => (
          <p key={line} className="max-w-none">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
