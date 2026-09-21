export function ReferenceBanner() {
  return (
    <div className="border-b border-amber-200 bg-amber-50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-3 py-3 sm:py-3.5 items-start sm:items-center">
          <div className="shrink-0 w-7 h-7 rounded-full bg-amber-500 text-white grid place-items-center text-[11px] font-bold" aria-hidden="true">!</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm leading-snug text-zinc-900">
              <span className="font-semibold">Reference Catalog — Demo Only</span>
              <span className="hidden sm:inline text-zinc-600"> — All 14 products are curated from free & open-source sources (MIT / ISC / CC). Estimated prices </span>
              <span className="inline sm:hidden text-zinc-600"> — Free & open-source sources. Estimated prices </span>
              <span className="line-through decoration-zinc-400">₹4,999</span>
              <span className="text-zinc-600"> → </span>
              <span className="font-bold text-emerald-700">₹0</span>
              <span className="text-zinc-600"> — not for sale. Click </span>
              <span className="font-medium text-zinc-900">“View Source”</span>
              <span className="text-zinc-600"> on any product to visit the original.</span>
            </p>
            <p className="sm:hidden text-xs text-zinc-500 mt-1">Tap any product → View Source — sources remain the owners.</p>
          </div>
          <a href="https://github.com/abustark/project_bmw" target="_blank" rel="noopener" className="hidden sm:inline-flex shrink-0 px-3 py-1.5 rounded-full bg-white border border-amber-200 text-xs font-medium hover:bg-amber-100 transition">Why this exists?</a>
        </div>
      </div>
    </div>
  )
}
