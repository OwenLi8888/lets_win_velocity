export function Header() {
  return (
    <header className="border-b border-waterloo-gold/30 bg-waterloo-black text-waterloo-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-semibold tracking-tight">
            Permit Pathway <span className="text-waterloo-gold">AI</span>
          </span>
          <span className="rounded bg-waterloo-gold/20 px-2 py-0.5 text-xs font-medium text-waterloo-gold">
            City of Waterloo
          </span>
        </div>
        <p className="hidden text-sm text-waterloo-white/80 sm:block">
          Decision-support approval navigator
        </p>
      </div>
    </header>
  );
}
