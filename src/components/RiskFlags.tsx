"use client";

import type { PolicyFinding, RiskIndicator } from "@/types/proposal";
import { AlertTriangle, Info } from "lucide-react";

const statusConfig = {
  likely_aligned: { label: "Likely aligned", class: "status-aligned", Icon: Info },
  requires_review: { label: "Requires review", class: "status-requires-review", Icon: AlertTriangle },
  high_risk_misalignment: { label: "High-risk misalignment", class: "status-high-risk", Icon: AlertTriangle },
};

export function PolicyFindingsList({ findings }: { findings: PolicyFinding[] }) {
  return (
    <div className="rounded-lg border border-waterloo-black/10 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-waterloo-muted">
        Policy alignment
      </h3>
      <ul className="space-y-2">
        {findings.map((f) => {
          const config = statusConfig[f.status];
          const Icon = config.Icon;
          return (
            <li
              key={f.id}
              className={`rounded border-l-4 p-3 ${config.class}`}
              title={f.policyRef}
            >
              <div className="flex items-start gap-2">
                <Icon className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{config.label} — {f.attribute}</p>
                  <p className="mt-0.5 text-sm opacity-90">{f.summary}</p>
                  <p className="mt-1 text-xs opacity-75">{f.policyRef}{f.section ? ` (${f.section})` : ""}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function RiskIndicatorsList({ risks }: { risks: RiskIndicator[] }) {
  const categoryLabels: Record<string, string> = {
    approval: "Approval risk",
    timeline: "Timeline risk",
    affordability: "Affordability risk",
    sustainability: "Sustainability / community risk",
  };
  const levelClass: Record<string, string> = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-amber-100 text-amber-800 border-amber-200",
    low: "bg-emerald-100 text-emerald-800 border-emerald-200",
  };

  return (
    <div className="rounded-lg border border-waterloo-black/10 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-waterloo-muted">
        Risk & delay signals
      </h3>
      <ul className="space-y-3">
        {risks.map((r) => (
          <li key={r.category} className="rounded border p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-waterloo-black">
                {categoryLabels[r.category] ?? r.category}
              </span>
              <span
                className={`rounded border px-2 py-0.5 text-xs font-medium capitalize ${levelClass[r.level]}`}
              >
                {r.level}
              </span>
            </div>
            <ul className="mt-2 list-inside list-disc text-sm text-waterloo-muted">
              {r.drivers.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
