"use client";

import type { PathwayResult } from "@/types/proposal";
import type { ProposalInput } from "@/types/proposal";
import { FileDown } from "lucide-react";

interface ExportActionsProps {
  proposal: ProposalInput;
  result: PathwayResult;
}

export function ExportActions({ proposal, result }: ExportActionsProps) {
  const exportChecklist = () => {
    const lines = [
      "Permit Pathway AI — Pre-submission checklist",
      "City of Waterloo | Decision-support output (not legal advice)",
      "",
      "Proposal: " + proposal.address,
      "Units: " + proposal.unitCount + " | Height: " + proposal.heightMetres + " m | Density: " + proposal.densityUnitsPerHa + " units/ha",
      "Affordable: " + proposal.affordableUnitPercent + "% | Parking: " + proposal.parkingRatio + " spaces/unit",
      "",
      "Approval readiness: " + result.approvalReadiness.replace(/_/g, " "),
      result.readinessReason,
      "",
      "--- Approval pathway ---",
      ...result.steps.map((s) => `• ${s.label} (${s.complexity} complexity${s.coordinationRisk ? ", coordination risk" : ""})`),
      "",
      "--- Policy alignment ---",
      ...result.findings.map((f) => `• ${f.attribute}: ${f.status.replace(/_/g, " ")} — ${f.summary} [${f.policyRef}]`),
      "",
      "--- Risk signals ---",
      ...result.risks.map((r) => `• ${r.category}: ${r.level} — ${r.drivers.join("; ")}`),
      "",
      "--- Incentive signals ---",
      ...result.incentives.map((i) => `• ${i.name}: ${i.eligible ? "Eligible" : "Not indicated"} — ${i.summary}`),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "permit-pathway-checklist.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const printSummary = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`
      <!DOCTYPE html><html><head><title>Permit Pathway — Summary</title></head><body style="font-family:system-ui;max-width:720px;margin:2rem auto;padding:1rem;">
      <h1>Permit Pathway AI — Policy alignment & risk overview</h1>
      <p><strong>Address:</strong> ${proposal.address}</p>
      <p><strong>Readiness:</strong> ${result.approvalReadiness.replace(/_/g, " ")}. ${result.readinessReason}</p>
      <h2>Approval pathway</h2><ul>${result.steps.map((s) => `<li>${s.label} (${s.complexity})</li>`).join("")}</ul>
      <h2>Policy alignment</h2><ul>${result.findings.map((f) => `<li>${f.attribute}: ${f.summary}</li>`).join("")}</ul>
      <h2>Risk signals</h2><ul>${result.risks.map((r) => `<li>${r.category}: ${r.level}</li>`).join("")}</ul>
      <p style="margin-top:2rem;font-size:0.875rem;color:#666;">City of Waterloo — Decision-support only. Does not replace human judgment or guarantee approvals.</p>
      </body></html>
    `);
    w.document.close();
    w.print();
    w.close();
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={exportChecklist}
        className="inline-flex items-center gap-2 rounded border border-waterloo-black/20 bg-white px-3 py-2 text-sm font-medium text-waterloo-black hover:bg-waterloo-black/5"
      >
        <FileDown className="h-4 w-4" />
        Download checklist
      </button>
      <button
        type="button"
        onClick={printSummary}
        className="inline-flex items-center gap-2 rounded border border-waterloo-black/20 bg-white px-3 py-2 text-sm font-medium text-waterloo-black hover:bg-waterloo-black/5"
      >
        Print summary
      </button>
    </div>
  );
}
