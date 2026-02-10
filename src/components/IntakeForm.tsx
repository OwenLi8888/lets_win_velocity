"use client";

import { useState } from "react";
import type { ProposalInput } from "@/types/proposal";

interface IntakeFormProps {
  initial?: Partial<ProposalInput>;
  onSubmit: (input: ProposalInput) => void;
  isAnalyzing?: boolean;
}

export function IntakeForm({ initial, onSubmit, isAnalyzing }: IntakeFormProps) {
  const [address, setAddress] = useState(initial?.address ?? "123 King St N, Waterloo");
  const [unitCount, setUnitCount] = useState(initial?.unitCount ?? 45);
  const [heightMetres, setHeightMetres] = useState(initial?.heightMetres ?? 18);
  const [densityUnitsPerHa, setDensityUnitsPerHa] = useState(initial?.densityUnitsPerHa ?? 85);
  const [affordableUnitPercent, setAffordableUnitPercent] = useState(initial?.affordableUnitPercent ?? 8);
  const [parkingRatio, setParkingRatio] = useState(initial?.parkingRatio ?? 0.9);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      address,
      unitCount,
      heightMetres,
      densityUnitsPerHa,
      affordableUnitPercent,
      parkingRatio,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-waterloo-black">
          Location / Address
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full rounded border border-waterloo-black/20 bg-white px-3 py-2 text-waterloo-black focus:border-waterloo-gold focus:outline-none focus:ring-1 focus:ring-waterloo-gold"
          placeholder="e.g. 123 King St N, Waterloo"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-waterloo-black">
            Unit count
          </label>
          <input
            type="number"
            min={1}
            value={unitCount}
            onChange={(e) => setUnitCount(Number(e.target.value))}
            className="w-full rounded border border-waterloo-black/20 bg-white px-3 py-2 text-waterloo-black focus:border-waterloo-gold focus:outline-none focus:ring-1 focus:ring-waterloo-gold"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-waterloo-black">
            Height (m)
          </label>
          <input
            type="number"
            min={1}
            step={0.5}
            value={heightMetres}
            onChange={(e) => setHeightMetres(Number(e.target.value))}
            className="w-full rounded border border-waterloo-black/20 bg-white px-3 py-2 text-waterloo-black focus:border-waterloo-gold focus:outline-none focus:ring-1 focus:ring-waterloo-gold"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-waterloo-black">
            Density (units/ha)
          </label>
          <input
            type="number"
            min={1}
            value={densityUnitsPerHa}
            onChange={(e) => setDensityUnitsPerHa(Number(e.target.value))}
            className="w-full rounded border border-waterloo-black/20 bg-white px-3 py-2 text-waterloo-black focus:border-waterloo-gold focus:outline-none focus:ring-1 focus:ring-waterloo-gold"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-waterloo-black">
            Affordable units (%)
          </label>
          <input
            type="number"
            min={0}
            max={100}
            step={1}
            value={affordableUnitPercent}
            onChange={(e) => setAffordableUnitPercent(Number(e.target.value))}
            className="w-full rounded border border-waterloo-black/20 bg-white px-3 py-2 text-waterloo-black focus:border-waterloo-gold focus:outline-none focus:ring-1 focus:ring-waterloo-gold"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-waterloo-black">
            Parking (spaces/unit)
          </label>
          <input
            type="number"
            min={0}
            step={0.1}
            value={parkingRatio}
            onChange={(e) => setParkingRatio(Number(e.target.value))}
            className="w-full rounded border border-waterloo-black/20 bg-white px-3 py-2 text-waterloo-black focus:border-waterloo-gold focus:outline-none focus:ring-1 focus:ring-waterloo-gold"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-waterloo-black">
          Proposal document (PDF, optional)
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="w-full rounded border border-waterloo-black/20 bg-white px-3 py-2 text-sm text-waterloo-black file:mr-2 file:rounded file:border-0 file:bg-waterloo-gold file:px-3 file:py-1 file:text-waterloo-black"
        />
      </div>

      <button
        type="submit"
        disabled={isAnalyzing}
        className="w-full rounded bg-waterloo-black py-2.5 font-medium text-waterloo-white transition hover:bg-waterloo-black/90 disabled:opacity-60 sm:w-auto sm:px-6"
      >
        {isAnalyzing ? "Analyzing…" : "Map approval pathway"}
      </button>
    </form>
  );
}
