<script setup lang="ts">
import type { Fragment } from '@/types/game'
import NeonButton from '@/components/ui/NeonButton.vue'

defineProps<{ fragment: Fragment }>()
defineEmits<{ back: [] }>()
</script>

<template>
  <div class="glass-panel hud-corner w-full max-w-md rounded-2xl border border-success/30 p-8 text-center">
    <p class="mb-2 font-mono-terminal text-xs uppercase tracking-widest text-success">FRAGMENT RETROUVÉ</p>
    <h2 class="mb-1 font-display text-4xl tracking-[0.2em] text-success text-glow-success">{{ fragment.key }}</h2>
    <p class="mb-6 font-mono-terminal text-sm text-primary">{{ fragment.successPercent }}% DU SYSTÈME RESTAURÉ</p>
    <div class="mb-6 h-1.5 w-full overflow-hidden bg-white/10">
      <div class="h-full bg-success shadow-[0_0_12px_rgba(34,197,94,0.7)] transition-all" :style="{ width: fragment.successPercent + '%' }"></div>
    </div>
    <p class="mb-8 whitespace-pre-line font-mono-terminal text-xs italic leading-relaxed text-ink-dim">{{ fragment.hint }}</p>
    <NeonButton variant="success" @click="$emit('back')">Retourner au HUD</NeonButton>
  </div>
</template>
