import { securityCipherLines } from "@/components/sections/security/security-data";

export function SecurityScramblePreview() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-[44rem] text-center">
      <div className="space-y-2 font-mono text-[0.82rem] tracking-[0.3em] text-security-ciphertext sm:text-[0.9rem]">
        {securityCipherLines.map((line) => (
          <p key={line} className="max-w-none">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
