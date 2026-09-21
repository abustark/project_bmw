<template>
  <div class="border-b border-amber-200 bg-amber-50">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex gap-3 py-3 sm:py-3.5 items-start sm:items-center">
        <div class="shrink-0 w-7 h-7 rounded-full bg-amber-500 text-white grid place-items-center text-[11px] font-bold" aria-hidden="true">!</div>
        <div class="flex-1 min-w-0">
          <p class="text-sm leading-snug text-zinc-900">
            <span class="font-semibold">Reference Catalog — Demo Only</span>
            <span class="hidden sm:inline text-zinc-600"> — All 14 products are curated from free & open-source sources (MIT / ISC / CC). Estimated prices </span>
            <span class="inline sm:hidden text-zinc-600"> — Free & open-source sources. Estimated prices </span>
            <span class="line-through decoration-zinc-400">₹4,999</span>
            <span class="text-zinc-600"> → </span>
            <span class="font-bold text-emerald-700">₹0</span>
            <span class="text-zinc-600"> — not for sale. Click </span>
            <span class="font-medium text-zinc-900">“View Source”</span>
            <span class="text-zinc-600"> on any product to visit the original.</span>
          </p>
          <p class="sm:hidden text-xs text-zinc-500 mt-1">Tap any product → View Source — sources remain the owners.</p>
        </div>
        <a href="https://github.com/abustark/project_bmw" target="_blank" rel="noopener" class="hidden sm:inline-flex shrink-0 px-3 py-1.5 rounded-full bg-white border border-amber-200 text-xs font-medium hover:bg-amber-100 transition">Why this exists?</a>
      </div>
    </div>
  </div>
</template>
