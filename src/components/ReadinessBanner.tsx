"use client";

import type { PathwayResult } from "@/types/proposal";
import { AlertCircle, CheckCircle, HelpCircle } from "lucide-react";

export function ReadinessBanner({
  approvalReadiness,
  readinessReason,
}: {
  approvalReadiness: PathwayResult["approvalReadiness"];
  readinessReason: string;
}) {
  const config = {
    not_ready: {
      label: "Not ready for submission",
      class: "bg-red-50 border-red-200 text-red-800",
      Icon: AlertCircle,
    },
    review_required: {
      label: "Review required",
      class: "bg-amber-50 border-amber-200 text-amber-900",
      Icon: HelpCircle,
    },
    ready_for_submission: {
      label: "Ready for submission",
      class: "bg-emerald-50 border-emerald-200 text-emerald-800",
      Icon: CheckCircle,
    },
  };
  const { label, class: className, Icon } = config[approvalReadiness];

  return (
    <div className={`flex items-start gap-3 rounded-lg border p-4 ${className}`}>
      <Icon className="h-6 w-6 shrink-0" />
      <div>
        <p className="font-semibold">{label}</p>
        <p className="mt-0.5 text-sm opacity-90">{readinessReason}</p>
      </div>
    </div>
  );
}
