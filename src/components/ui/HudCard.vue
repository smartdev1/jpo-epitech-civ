<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: '' })
</script>

<template>
  <div class="glass-panel hud-corner relative rounded-xl p-4">
    <div v-if="label" class="mb-2 flex items-center justify-between font-mono-terminal text-[10px] uppercase tracking-widest text-primary/70">
      <span>{{ label }}</span>
      <span class="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow"></span>
    </div>
    <slot />
  </div>
</template>
