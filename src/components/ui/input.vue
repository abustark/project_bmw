<script setup>
import { cn } from "@/lib/utils"

const props = defineProps({
  class: String,
  modelValue: [String, Number],
})

const emit = defineEmits(["update:modelValue"])

function onInput(e) {
  emit("update:modelValue", e.target.value)
}
</script>

<template>
  <input
    :value="modelValue"
    @input="onInput"
    :class="cn('flex h-10 w-full rounded-[8px] border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] px-4 py-2 text-sm text-[hsl(var(--ink))] placeholder:text-[hsl(var(--ink-subtle))] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', props.class)"
  />
</template>
