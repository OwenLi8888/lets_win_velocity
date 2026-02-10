"use client";

import { useState } from "react";
import type { ProposalInput } from "@/types/proposal";
import type { PathwayResult } from "@/types/proposal";
import { Header } from "@/components/Header";
import { IntakeForm } from "@/components/IntakeForm";
import { LoadingGoose } from "@/components/LoadingGoose";
import { ReadinessBanner } from "@/components/ReadinessBanner";
import { PathwayMap } from "@/components/PathwayMap";
import { PolicyFindingsList, RiskIndicatorsList } from "@/components/RiskFlags";
import { IncentivesPanel } from "@/components/IncentivesPanel";
import { OptimizationMode } from "@/components/OptimizationMode";
import { ExportActions } from "@/components/ExportActions";
import { SlidersHorizontal, FileText } from "lucide-react";
import { SAMPLE_RFPS } from "@/lib/sampleProposals";

export default function Home() {
  const [proposal, setProposal] = useState<ProposalInput | null>(null);
  const [result, setResult] = useState<PathwayResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [optimizationOpen, setOptimizationOpen] = useState(false);
  const [sampleName, setSampleName] = useState<string | null>(null);

  const runDemo = async (sample: (typeof SAMPLE_RFPS)[0]) => {
    setSampleName(sample.name);
    setProposal(sample.proposal);
    setResult(null);
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/pathway", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sample.proposal),
      });
      if (!res.ok) throw new Error("Analysis failed");
      const data = await res.json();
      setResult(data);
    } catch {
      setResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleIntakeSubmit = async (input: ProposalInput) => {
    setProposal(input);
    setResult(null);
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/pathway", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error("Analysis failed");
      const data = await res.json();
      setResult(data);
    } catch {
      setResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <section className="mb-6">
          <h1 className="text-2xl font-semibold text-waterloo-black sm:text-3xl">
            Approval pathway mapper
          </h1>
          <p className="mt-1 text-waterloo-muted">
            Enter your housing proposal to see likely approval steps, policy alignment signals, and risk indicators. All outputs are advisory and require human review.
          </p>
        </section>

        <section className="mb-8 rounded-lg border border-waterloo-gold/40 bg-waterloo-gold/5 p-4">
          <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-waterloo-black">
            <FileText className="h-4 w-4 text-waterloo-gold" />
            Demo with sample RFP
          </h2>
          <p className="mb-3 text-sm text-waterloo-muted">
            Load a sample Waterloo housing proposal and run the full pathway analysis.
          </p>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_RFPS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => runDemo(sample)}
                disabled={isAnalyzing}
                className="rounded border border-waterloo-gold bg-white px-3 py-2 text-sm font-medium text-waterloo-black transition hover:bg-waterloo-gold/20 disabled:opacity-60"
              >
                {sample.name}
              </button>
            ))}
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-waterloo-black/10 bg-white p-4">
              <h2 className="mb-4 text-lg font-semibold text-waterloo-black">
                Project intake
              </h2>
              <IntakeForm
                key={proposal ? `${proposal.address}-${proposal.unitCount}` : "empty"}
                initial={proposal ?? undefined}
                onSubmit={handleIntakeSubmit}
                isAnalyzing={isAnalyzing}
              />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {isAnalyzing && <LoadingGoose />}

            {!isAnalyzing && result && proposal && (
              <>
                {sampleName && (
                  <div className="rounded-lg border border-waterloo-black/10 bg-white p-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-waterloo-muted">
                      Sample RFP
                    </p>
                    <p className="mt-0.5 font-medium text-waterloo-black">{sampleName}</p>
                    <p className="mt-1 text-sm text-waterloo-muted">
                      {SAMPLE_RFPS.find((s) => s.name === sampleName)?.description}
                    </p>
                  </div>
                )}
                {optimizationOpen ? (
                  <OptimizationMode
                    initial={proposal}
                    onClose={() => setOptimizationOpen(false)}
                  />
                ) : (
                  <>
                    <ReadinessBanner
                      approvalReadiness={result.approvalReadiness}
                      readinessReason={result.readinessReason}
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setOptimizationOpen(true)}
                        className="inline-flex items-center gap-2 rounded bg-waterloo-gold px-4 py-2 text-sm font-medium text-waterloo-black hover:bg-waterloo-gold-light"
                      >
                        <SlidersHorizontal className="h-4 w-4" />
                        Optimization mode
                      </button>
                      <ExportActions proposal={proposal} result={result} />
                    </div>
                    <PathwayMap steps={result.steps} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <PolicyFindingsList findings={result.findings} />
                      <RiskIndicatorsList risks={result.risks} />
                    </div>
                    <IncentivesPanel incentives={result.incentives} />
                  </>
                )}
              </>
            )}

            {!isAnalyzing && !result && proposal && (
              <p className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                Analysis could not be completed. Please try again.
              </p>
            )}
          </div>
        </div>

        <footer className="mt-12 border-t border-waterloo-black/10 pt-6 text-center text-sm text-waterloo-muted">
          Permit Pathway AI — Decision-support only. Does not validate compliance, guarantee approvals, or replace human judgment. City of Waterloo.
        </footer>
      </main>
    </div>
  );
}
