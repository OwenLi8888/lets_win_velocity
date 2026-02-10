export type RiskLevel = "low" | "medium" | "high";

export type AlignmentStatus =
  | "likely_aligned"
  | "requires_review"
  | "high_risk_misalignment";

export interface ProposalInput {
  address: string;
  unitCount: number;
  heightMetres: number;
  densityUnitsPerHa: number;
  affordableUnitPercent: number;
  parkingRatio: number; // spaces per unit
  documentUrl?: string;
}

export interface ApprovalStep {
  id: string;
  label: string;
  complexity: RiskLevel;
  coordinationRisk: boolean;
  policyRef?: string;
}

export interface PolicyFinding {
  id: string;
  attribute: string;
  status: AlignmentStatus;
  summary: string;
  policyRef: string;
  section?: string;
}

export interface RiskIndicator {
  category: "approval" | "timeline" | "affordability" | "sustainability";
  level: RiskLevel;
  drivers: string[];
}

export interface IncentiveSignal {
  id: string;
  name: string;
  eligible: boolean;
  summary: string;
  tradeoff?: string;
  warning?: string;
}

export interface PathwayResult {
  steps: ApprovalStep[];
  findings: PolicyFinding[];
  risks: RiskIndicator[];
  incentives: IncentiveSignal[];
  approvalReadiness: "not_ready" | "review_required" | "ready_for_submission";
  readinessReason: string;
}
