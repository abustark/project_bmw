<template>
  <!-- Linear-style announcement bar: one quiet line, links to About -->
  <div class="border-b border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))]">
    <router-link to="/about" class="group max-w-[1280px] mx-auto px-4 h-9 flex items-center justify-center gap-2 text-[11px] sm:text-xs text-[hsl(var(--ink-subtle))] hover:text-[hsl(var(--ink))] transition">
      <span class="w-1.5 h-1.5 rounded-full bg-[#5e6ad2] shrink-0" aria-hidden="true"></span>
      <span class="truncate">N-GELO is a reference showcase — every product is ₹0 and nothing is for sale</span>
      <svg class="w-3 h-3 shrink-0 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
    </router-link>
  </div>
</template>
