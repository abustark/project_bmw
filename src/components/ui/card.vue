<script setup>
import { cn } from "@/lib/utils"

const props = defineProps({
  class: { type: String, default: "" },
})
</script>

<template>
  <div :class="cn('rounded-[20px] border bg-card text-card-foreground shadow-soft', props.class)">
    <slot />
  </div>
</template>
