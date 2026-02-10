"use client";

import { useMemo, useCallback, useState } from "react";
import type { ProposalInput, PathwayResult } from "@/types/proposal";
import {
  getApprovalSteps,
  getPolicyFindings,
  getRiskIndicators,
  getIncentiveSignals,
  getApprovalReadiness,
} from "@/lib/mockPolicy";
import { PathwayMap } from "./PathwayMap";
import { PolicyFindingsList, RiskIndicatorsList } from "./RiskFlags";
import { IncentivesPanel } from "./IncentivesPanel";
import { ReadinessBanner } from "./ReadinessBanner";
import { SlidersHorizontal } from "lucide-react";

interface OptimizationModeProps {
  initial: ProposalInput;
  onClose: () => void;
}

export function OptimizationMode({ initial, onClose }: OptimizationModeProps) {
  const [input, setInput] = useState(initial);
  const result = useMemo((): PathwayResult => {
    const steps = getApprovalSteps(input);
    const findings = getPolicyFindings(input);
    const risks = getRiskIndicators(input);
    const incentives = getIncentiveSignals(input);
    const { status, reason } = getApprovalReadiness(findings, risks);
    return {
      steps,
      findings,
      risks,
      incentives,
      approvalReadiness: status,
      readinessReason: reason,
    };
  }, [input]);

  const update = useCallback((key: keyof ProposalInput, value: number) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div className="rounded-xl border-2 border-waterloo-gold bg-waterloo-white p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-waterloo-gold" />
          <h2 className="text-lg font-semibold text-waterloo-black">
            Optimization mode
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded border border-waterloo-black/20 px-3 py-1.5 text-sm font-medium hover:bg-waterloo-black/5"
        >
          Done
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm text-waterloo-muted">
            Adjust sliders to see risk and alignment update in real time.
          </p>
          <div className="space-y-4 rounded-lg border border-waterloo-black/10 bg-white p-4">
            <SliderRow
              label="Height (m)"
              value={input.heightMetres}
              min={6}
              max={40}
              step={1}
              onChange={(v) => update("heightMetres", v)}
            />
            <SliderRow
              label="Unit count"
              value={input.unitCount}
              min={5}
              max={200}
              step={5}
              onChange={(v) => update("unitCount", v)}
            />
            <SliderRow
              label="Affordable units (%)"
              value={input.affordableUnitPercent}
              min={0}
              max={40}
              step={1}
              onChange={(v) => update("affordableUnitPercent", v)}
            />
            <SliderRow
              label="Parking (spaces/unit)"
              value={input.parkingRatio}
              min={0}
              max={2}
              step={0.1}
              onChange={(v) => update("parkingRatio", v)}
            />
            <SliderRow
              label="Density (units/ha)"
              value={input.densityUnitsPerHa}
              min={30}
              max={150}
              step={5}
              onChange={(v) => update("densityUnitsPerHa", v)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <ReadinessBanner
            approvalReadiness={result.approvalReadiness}
            readinessReason={result.readinessReason}
          />
          <PathwayMap steps={result.steps} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <PolicyFindingsList findings={result.findings} />
        <RiskIndicatorsList risks={result.risks} />
      </div>
      <div className="mt-4">
        <IncentivesPanel incentives={result.incentives} />
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="font-medium text-waterloo-black">{label}</span>
        <span className="text-waterloo-muted">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 h-2 w-full accent-waterloo-gold"
      />
    </div>
  );
}

