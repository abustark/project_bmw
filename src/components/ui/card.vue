<script setup>
import { cn } from "@/lib/utils"

const props = defineProps({
  class: { type: String, default: "" },
})
</script>

<template>
  <div :class="cn('rounded-[12px] border border-[hsl(var(--hairline))] bg-card text-card-foreground shadow-none', props.class)">
    <slot />
  </div>
</template>
