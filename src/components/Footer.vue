<template>
  <footer class="border-t border-[hsl(var(--hairline))] bg-[hsl(var(--canvas))]">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-2 md:grid-cols-12 gap-8">
        <!-- brand -->
        <div class="col-span-2 md:col-span-5">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-[8px] bg-[#5e6ad2] text-white grid place-items-center font-semibold text-[13px]">N</div>
            <div class="font-brand font-semibold text-[16px] tracking-tight text-[hsl(var(--ink))] leading-none">N-GELO</div>
            <span class="font-brand font-bold text-[10px] tracking-[0.14em] leading-none px-2 py-1 rounded-[6px] bg-[#5e6ad2]/10 border border-[#5e6ad2]/30 text-[#5e6ad2] dark:text-[#828fff]">B·M·W</span>
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

      <!-- sources row -->
      <div class="mt-8 pt-5 border-t border-[hsl(var(--hairline))]">
        <p class="text-[11px] text-[hsl(var(--ink-subtle))] font-mono leading-relaxed">
          <span v-for="(s, i) in sources" :key="s"><span translate="no">{{ s }}</span><span v-if="i < sources.length - 1" class="opacity-40"> · </span></span>
        </p>
      </div>

      <!-- credit row — serif brand font, BMW initials bold -->
      <div class="mt-4 font-brand text-xs text-[hsl(var(--ink-subtle))] leading-relaxed">
        <p>© 2026 ABu. All rights reserved.</p>
        <p class="mt-0.5">Created by <span class="text-[hsl(var(--ink))]"><span class="font-bold">B</span>asith <span class="font-bold">M</span>uthu <span class="font-bold">W</span>asim</span>. Maintained by me.</p>
        <p class="mt-1.5">Copy · Paste · Ship — free UI, extracted &amp; rendered live.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const sources = ['shadcn/ui', 'Radix', 'Heroicons', 'Lucide', 'Flowbite', 'daisyUI', 'AstroWind', 'Vercel Commerce', 'Cruip', 'Uiverse', 'CSS Loaders', 'LottieFiles', 'Motion', 'View Transitions']
</script>
