<template>
  <footer class="border-t border-[hsl(var(--hairline))] bg-[hsl(var(--canvas))]">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-2 md:grid-cols-12 gap-8">
        <!-- brand -->
        <div class="col-span-2 md:col-span-5">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-[8px] bg-[#5e6ad2] text-white grid place-items-center font-semibold text-[13px]">N</div>
            <div class="font-semibold text-[15px] tracking-tight text-[hsl(var(--ink))] leading-none">N-GELO</div>
          </div>
          <p class="mt-3 text-xs text-[hsl(var(--ink-subtle))] leading-relaxed max-w-[380px]">A reference showcase of 14 free, open-source components — extracted and rendered in this page. Not for sale.</p>
        </div>
        <!-- marketplace -->
        <div class="md:col-span-3">
          <div class="text-[11px] tracking-[0.18em] font-medium text-[hsl(var(--ink-subtle))]">MARKETPLACE</div>
          <ul class="mt-3 space-y-2 text-sm text-[hsl(var(--ink-muted))]">
            <li><router-link to="/shop" class="hover:text-[hsl(var(--ink))]">All components — ₹0</router-link></li>
            <li><router-link to="/shop?cat=buttons" class="hover:text-[hsl(var(--ink))]">Buttons</router-link></li>
            <li><router-link to="/shop?cat=loaders" class="hover:text-[hsl(var(--ink))]">Loaders</router-link></li>
            <li><router-link to="/about" class="hover:text-[hsl(var(--ink))]">About & FAQ</router-link></li>
          </ul>
        </div>
        <!-- account -->
        <div class="md:col-span-4">
          <div class="text-[11px] tracking-[0.18em] font-medium text-[hsl(var(--ink-subtle))]">ACCOUNT</div>
          <ul class="mt-3 space-y-2 text-sm text-[hsl(var(--ink-muted))]">
            <li><router-link to="/dashboard" class="hover:text-[hsl(var(--ink))]">Dashboard</router-link></li>
            <li><router-link to="/wishlist" class="hover:text-[hsl(var(--ink))]">Wishlist</router-link></li>
            <li><router-link to="/cart" class="hover:text-[hsl(var(--ink))]">Cart — ₹0</router-link></li>
          </ul>
        </div>
      </div>

      <!-- bottom row: sources + status -->
      <div class="mt-8 pt-5 border-t border-[hsl(var(--hairline))] flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <p class="text-[11px] text-[hsl(var(--ink-subtle))] font-mono">
          <span v-for="(s, i) in sources" :key="s"><span translate="no">{{ s }}</span><span v-if="i < sources.length - 1" class="opacity-40"> · </span></span>
        </p>
        <div class="flex items-center gap-4 text-[11px] text-[hsl(var(--ink-subtle))]">
          <span>© {{ new Date().getFullYear() }} N-GELO</span>
          <span class="inline-flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-[#5e6ad2]"></span> Reference demo · ₹0</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const sources = ['shadcn/ui', 'Radix', 'Heroicons', 'Lucide', 'Flowbite', 'daisyUI', 'AstroWind', 'Vercel Commerce', 'Cruip', 'Uiverse', 'CSS Loaders', 'LottieFiles', 'Motion', 'View Transitions']
</script>
