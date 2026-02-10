"use client";

import type { IncentiveSignal } from "@/types/proposal";
import { Check, X } from "lucide-react";

export function IncentivesPanel({ incentives }: { incentives: IncentiveSignal[] }) {
  return (
    <div className="rounded-lg border border-waterloo-black/10 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-waterloo-muted">
        Affordability & incentive signals
      </h3>
      <ul className="space-y-3">
        {incentives.map((inc) => (
          <li key={inc.id} className="rounded border border-waterloo-black/10 p-3">
            <div className="flex items-start justify-between gap-2">
              <span className="font-medium text-waterloo-black">{inc.name}</span>
              {inc.eligible ? (
                <span className="flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                  <Check className="h-3.5 w-3.5" /> Eligible
                </span>
              ) : (
                <span className="flex items-center gap-1 rounded bg-waterloo-black/10 px-2 py-0.5 text-xs text-waterloo-muted">
                  <X className="h-3.5 w-3.5" /> Not indicated
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-waterloo-muted">{inc.summary}</p>
            {inc.tradeoff && (
              <p className="mt-1 text-xs text-waterloo-muted">Tradeoff: {inc.tradeoff}</p>
            )}
            {inc.warning && (
              <p className="mt-1 text-xs text-amber-700">Warning: {inc.warning}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
