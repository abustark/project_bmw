export function ReferenceBanner() {
  return (
    <div className="border-b border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-3 py-2.5 items-center">
          <span className="shrink-0 w-2 h-2 rounded-full bg-[#5e6ad2]" aria-hidden="true" />
          <p className="flex-1 min-w-0 text-xs leading-none tracking-wide text-[hsl(var(--ink-subtle))] truncate">
            <span className="font-medium text-[hsl(var(--ink))] hidden sm:inline">N-GELO Reference</span>
            <span className="sm:hidden font-medium text-[hsl(var(--ink))]">Reference</span>
            <span className="mx-2 opacity-40">·</span>
            14 free · MIT / ISC · <span className="line-through">₹4,999</span> → <span className="font-medium text-[hsl(var(--ink))]">₹0</span>
            <span className="hidden md:inline mx-2 opacity-40">·</span>
            <span className="hidden md:inline">source on card · rendered here · no outbound</span>
          </p>
          <span className="hidden sm:inline-flex shrink-0 text-[11px] tracking-widest font-medium text-[hsl(var(--ink-subtle))] border border-[hsl(var(--hairline))] bg-[hsl(var(--canvas))] px-2.5 py-1 rounded-full">DEMO · ₹0</span>
        </div>
      </div>
    </div>
  )
}
