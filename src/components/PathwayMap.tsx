"use client";

import type { ApprovalStep } from "@/types/proposal";
import { AlertCircle, CheckCircle, ChevronRight } from "lucide-react";

function StepIcon({ complexity }: { complexity: string }) {
  if (complexity === "high") return <AlertCircle className="h-5 w-5 text-red-500" />;
  if (complexity === "medium") return <AlertCircle className="h-5 w-5 text-amber-500" />;
  return <CheckCircle className="h-5 w-5 text-emerald-600" />;
}

export function PathwayMap({ steps }: { steps: ApprovalStep[] }) {
  return (
    <div className="rounded-lg border border-waterloo-black/10 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-waterloo-muted">
        Approval pathway
      </h3>
      <ul className="space-y-0">
        {steps.map((step, i) => (
          <li key={step.id} className="flex items-start gap-3">
            <div className="flex shrink-0 items-center gap-2">
              <StepIcon complexity={step.complexity} />
              {i < steps.length - 1 && (
                <ChevronRight className="h-4 w-4 text-waterloo-muted" />
              )}
            </div>
            <div className="min-w-0 flex-1 pb-4">
              <p className="font-medium text-waterloo-black">{step.label}</p>
              <div className="mt-0.5 flex flex-wrap gap-2">
                <span
                  className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                    step.complexity === "high"
                      ? "bg-red-100 text-red-800"
                      : step.complexity === "medium"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {step.complexity} complexity
                </span>
                {step.coordinationRisk && (
                  <span className="rounded bg-waterloo-gold/20 px-1.5 py-0.5 text-xs text-waterloo-gold-dark">
                    Coordination risk
                  </span>
                )}
                {step.policyRef && (
                  <span className="text-xs text-waterloo-muted">{step.policyRef}</span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
