"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";

export function VerifyLookupForm({ initialCode = "" }: { initialCode?: string }) {
  const router = useRouter();
  const [code, setCode] = useState(initialCode);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const clean = code.trim();
    if (!clean) return;
    router.push(`/verify/${encodeURIComponent(clean)}`);
  }

  return (
    <form onSubmit={onSubmit} className="card-line p-6 flex flex-col sm:flex-row gap-3">
      <label htmlFor="verify-code" className="sr-only">
        Verification token or pass code
      </label>
      <input
        id="verify-code"
        type="text"
        required
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter Admit Card / Receipt / Gate Pass / ID code"
        className="field-input flex-1 font-mono"
      />
      <button type="submit" className="btn btn-navy shrink-0">
        <Icons.QrCode className="h-4 w-4" aria-hidden="true" />
        Verify Code
      </button>
    </form>
  );
}

