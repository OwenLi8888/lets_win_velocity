# Permit Pathway AI

**Decision-support approval navigator for the City of Waterloo.**  
Accelerate housing approvals by identifying policy misalignment, approval risk, and incentive opportunities before formal submission.

- **Theme:** City of Waterloo — black, gold, white. Professional municipal software.
- **Scope:** MVP hackathon build. Advisory only — does not validate compliance or guarantee approvals.

## Features (MVP)

1. **Project Intake** — Address, unit count, height, density, affordable %, parking ratio, optional PDF upload.
2. **Approval Pathway Mapper** — Visual pathway, approval checklist, review attention flags.
3. **Policy Alignment & Risk Flagging** — Likely aligned / requires review / high-risk misalignment with policy references.
4. **Risk & Delay Scoring** — Approval, timeline, affordability, sustainability risk (low/medium/high) with drivers.
5. **Affordability & Incentive Signals** — Density bonus, fee relief, expedited review eligibility.
6. **Optimization Mode** — Real-time sliders for height, units, affordable mix, parking, density; live risk and readiness updates.
7. **Export** — Download checklist (TXT), print summary.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo flow

1. Enter or upload a Waterloo housing proposal.
2. Click **Map approval pathway** → pathway and risks appear.
3. Open **Optimization mode** → adjust sliders; risk and readiness update in real time.
4. Export submission-ready checklist / summary.

## Tech

- Next.js 14 (App Router), React, TypeScript, Tailwind CSS.
- Mock rule-based policy and risk logic in `src/lib/mockPolicy.ts`.
- API: `POST /api/pathway` with proposal JSON → pathway result.

## Disclaimer

This product is decision-support only. It does not replace human judgment, claim legal compliance verification, or guarantee timelines or approvals. All outputs are advisory and require human review.
