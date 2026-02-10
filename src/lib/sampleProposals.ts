import type { ProposalInput } from "@/types/proposal";

export interface SampleRFP {
  id: string;
  name: string;
  description: string;
  proposal: ProposalInput;
}

/** Sample housing proposals for City of Waterloo demo. */
export const SAMPLE_RFPS: SampleRFP[] = [
  {
    id: "ion-midrise",
    name: "ION Corridor mid-rise",
    description:
      "Mixed-use mid-rise on King Street North, one block from ION stop. 72 units (8-storey), 12% affordable, transit-oriented parking. Aligns with corridor intensification targets; may trigger urban design review due to unit count.",
    proposal: {
      address: "255 King St N, Waterloo (adjacent to ION LRT)",
      unitCount: 72,
      heightMetres: 26,
      densityUnitsPerHa: 95,
      affordableUnitPercent: 12,
      parkingRatio: 0.65,
    },
  },
  {
    id: "uptown-high",
    name: "Uptown high-density",
    description:
      "High-density residential tower in Uptown Waterloo. 180 units, 22 storeys, 8% affordable, above guideline parking. High risk flags expected: height, density, and parking vs. sustainability targets.",
    proposal: {
      address: "75 King St S, Waterloo (Uptown core)",
      unitCount: 180,
      heightMetres: 68,
      densityUnitsPerHa: 125,
      affordableUnitPercent: 8,
      parkingRatio: 1.1,
    },
  },
  {
    id: "small-byright",
    name: "Small-scale by-right style",
    description:
      "Smaller infill proposal: 24 units, 4 storeys, 15% affordable, low parking. Designed to align with by-right and expedited review where possible; few risk flags expected.",
    proposal: {
      address: "420 Erb St W, Waterloo",
      unitCount: 24,
      heightMetres: 14,
      densityUnitsPerHa: 55,
      affordableUnitPercent: 15,
      parkingRatio: 0.6,
    },
  },
];
