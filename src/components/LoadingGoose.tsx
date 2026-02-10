"use client";

export function LoadingGoose() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8 text-waterloo-muted">
      <div className="text-4xl" aria-hidden>
        🪿
      </div>
      <p className="text-sm">Analyzing pathway…</p>
    </div>
  );
}
