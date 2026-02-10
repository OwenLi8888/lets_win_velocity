import { NextRequest, NextResponse } from "next/server";
import type { ProposalInput } from "@/types/proposal";
import {
  getApprovalSteps,
  getPolicyFindings,
  getRiskIndicators,
  getIncentiveSignals,
  getApprovalReadiness,
} from "@/lib/mockPolicy";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ProposalInput;
    const steps = getApprovalSteps(body);
    const findings = getPolicyFindings(body);
    const risks = getRiskIndicators(body);
    const incentives = getIncentiveSignals(body);
    const { status, reason } = getApprovalReadiness(findings, risks);
    return NextResponse.json({
      steps,
      findings,
      risks,
      incentives,
      approvalReadiness: status,
      readinessReason: reason,
    });
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
