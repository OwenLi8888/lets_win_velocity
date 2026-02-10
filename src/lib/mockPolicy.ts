import type { ApprovalStep, PolicyFinding, RiskIndicator, IncentiveSignal } from "@/types/proposal";
import type { ProposalInput } from "@/types/proposal";

const HEIGHT_THRESHOLD = 14; // metres - above may need site plan, design review
const DENSITY_HIGH = 100; // units/ha
const AFFORDABLE_THRESHOLD = 10; // % for incentives
const PARKING_MAX = 1.2; // above may trigger review

export function getApprovalSteps(input: ProposalInput): ApprovalStep[] {
  const steps: ApprovalStep[] = [
    { id: "zoning", label: "Zoning conformity review", complexity: "low", coordinationRisk: false, policyRef: "Zoning Bylaw" },
    { id: "site-plan", label: "Site plan approval", complexity: input.heightMetres > HEIGHT_THRESHOLD ? "medium" : "low", coordinationRisk: false },
    { id: "building", label: "Building permit application", complexity: "low", coordinationRisk: false },
    { id: "env", label: "Environmental / tree preservation check", complexity: "low", coordinationRisk: true, policyRef: "Tree Bylaw" },
  ];
  if (input.unitCount >= 50) {
    steps.push({ id: "design", label: "Urban design review", complexity: "medium", coordinationRisk: true, policyRef: "Design Guidelines" });
  }
  if (input.affordableUnitPercent > 0) {
    steps.push({ id: "affordability", label: "Affordability program verification", complexity: "medium", coordinationRisk: false, policyRef: "Housing Strategy" });
  }
  return steps;
}

export function getPolicyFindings(input: ProposalInput): PolicyFinding[] {
  const findings: PolicyFinding[] = [];

  if (input.heightMetres > 20) {
    findings.push({
      id: "h-1",
      attribute: "Height",
      status: "requires_review",
      summary: "Height exceeds typical by-right limits in many zones. May require variance or rezoning.",
      policyRef: "Zoning Bylaw",
      section: "Height provisions",
    });
  } else if (input.heightMetres <= HEIGHT_THRESHOLD) {
    findings.push({
      id: "h-2",
      attribute: "Height",
      status: "likely_aligned",
      summary: "Height within common by-right range for low-mid rise.",
      policyRef: "Zoning Bylaw",
    });
  }

  if (input.densityUnitsPerHa > DENSITY_HIGH) {
    findings.push({
      id: "d-1",
      attribute: "Density",
      status: "requires_review",
      summary: "High density may trigger official plan or zoning amendment.",
      policyRef: "Official Plan",
    });
  }

  if (input.parkingRatio > PARKING_MAX) {
    findings.push({
      id: "p-1",
      attribute: "Parking",
      status: "high_risk_misalignment",
      summary: "Parking ratio above guideline may conflict with transit-oriented and sustainability targets.",
      policyRef: "Parking Standards",
    });
  } else if (input.parkingRatio < 0.5) {
    findings.push({
      id: "p-2",
      attribute: "Parking",
      status: "requires_review",
      summary: "Low parking ratio may require justification and transportation study.",
      policyRef: "Parking Standards",
    });
  }

  if (input.affordableUnitPercent >= AFFORDABLE_THRESHOLD) {
    findings.push({
      id: "a-1",
      attribute: "Affordable units",
      status: "likely_aligned",
      summary: "Meets or exceeds typical inclusionary threshold for incentive eligibility.",
      policyRef: "Housing Strategy",
    });
  }

  return findings;
}

export function getRiskIndicators(input: ProposalInput): RiskIndicator[] {
  const risks: RiskIndicator[] = [];
  let approvalDrivers: string[] = [];
  let timelineDrivers: string[] = [];
  let affordabilityDrivers: string[] = [];
  let sustainabilityDrivers: string[] = [];

  if (input.heightMetres > HEIGHT_THRESHOLD) {
    approvalDrivers.push("Height may trigger design review or variance");
    timelineDrivers.push("Additional review steps likely");
  }
  if (input.unitCount >= 50) {
    approvalDrivers.push("Large project triggers urban design review");
    timelineDrivers.push("Multi-stakeholder coordination required");
  }
  if (input.parkingRatio > PARKING_MAX) {
    sustainabilityDrivers.push("Parking ratio above sustainability targets");
    approvalDrivers.push("Parking policy misalignment");
  }
  if (input.affordableUnitPercent > 0 && input.affordableUnitPercent < 5) {
    affordabilityDrivers.push("Low affordable share may limit incentive eligibility");
  }

  if (approvalDrivers.length === 0) approvalDrivers.push("No major approval hurdles identified");
  if (timelineDrivers.length === 0) timelineDrivers.push("Standard pathway expected");
  if (affordabilityDrivers.length === 0) affordabilityDrivers.push("No affordability risk drivers flagged");
  if (sustainabilityDrivers.length === 0) sustainabilityDrivers.push("No sustainability conflicts flagged");

  risks.push(
    { category: "approval", level: approvalDrivers.length > 2 ? "high" : approvalDrivers.length > 1 ? "medium" : "low", drivers: approvalDrivers },
    { category: "timeline", level: timelineDrivers.length > 1 ? "medium" : "low", drivers: timelineDrivers },
    { category: "affordability", level: affordabilityDrivers.some(d => d.includes("limit")) ? "medium" : "low", drivers: affordabilityDrivers },
    { category: "sustainability", level: sustainabilityDrivers.some(d => d.includes("above")) ? "high" : "low", drivers: sustainabilityDrivers },
  );
  return risks;
}

export function getIncentiveSignals(input: ProposalInput): IncentiveSignal[] {
  const signals: IncentiveSignal[] = [
    {
      id: "density-bonus",
      name: "Density bonus",
      eligible: input.affordableUnitPercent >= AFFORDABLE_THRESHOLD && input.densityUnitsPerHa <= 120,
      summary: input.affordableUnitPercent >= AFFORDABLE_THRESHOLD
        ? "Proposal may qualify for density bonus under housing strategy."
        : "Increase affordable unit share to potentially qualify.",
      tradeoff: "Additional units contingent on affordability commitment.",
    },
    {
      id: "fee-waiver",
      name: "Development charge relief",
      eligible: input.affordableUnitPercent >= 15,
      summary: input.affordableUnitPercent >= 15
        ? "Affordability mix may support fee waiver or relief programs."
        : "Higher affordable percentage may unlock fee relief.",
      warning: input.affordableUnitPercent > 25 ? "High affordable share may impact feasibility — review pro forma." : undefined,
    },
    {
      id: "expedited",
      name: "Expedited review signal",
      eligible: input.unitCount <= 30 && input.heightMetres <= HEIGHT_THRESHOLD && input.affordableUnitPercent >= 5,
      summary: "Smaller scale with affordability component may align with fast-track criteria.",
    },
  ];
  return signals;
}

export function getApprovalReadiness(
  findings: PolicyFinding[],
  risks: RiskIndicator[]
): { status: "not_ready" | "review_required" | "ready_for_submission"; reason: string } {
  const hasHighRisk = findings.some(f => f.status === "high_risk_misalignment") || risks.some(r => r.level === "high");
  const hasReview = findings.some(f => f.status === "requires_review") || risks.some(r => r.level === "medium");
  if (hasHighRisk) return { status: "not_ready", reason: "High-risk misalignment or risk indicators require resolution before submission." };
  if (hasReview) return { status: "review_required", reason: "Some items require review; address flags to improve readiness." };
  return { status: "ready_for_submission", reason: "No major misalignments flagged; pathway appears clear for submission." };
}
