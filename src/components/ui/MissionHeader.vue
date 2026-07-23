<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useGameStore } from '@/stores/game'
import { TOTAL_FRAGMENTS } from '@/types/game'

const store = useGameStore()
const now = ref(Date.now())
let intervalId: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  intervalId = setInterval(() => (now.value = Date.now()), 1000)
})
onUnmounted(() => clearInterval(intervalId))

const elapsed = computed(() => {
  if (!store.startTime) return 0
  return Math.max(0, Math.floor((now.value - new Date(store.startTime).getTime()) / 1000))
})

const formatted = computed(() => {
  const minutes = Math.floor(elapsed.value / 60)
  const seconds = elapsed.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})
</script>

<template>
  <header class="fixed top-0 z-40 flex h-16 w-full items-center justify-between border-b border-primary/20 bg-surface/70 px-4 backdrop-blur-xl shadow-[0_0_15px_rgba(0,229,255,0.08)]">
    <div class="flex items-center gap-2 font-mono-terminal text-[11px] uppercase tracking-widest text-primary">
      <span class="text-primary">&gt;_</span>
      <span>MISSION: EPITECH_VOID</span>
    </div>
    <div class="flex items-center gap-4 font-mono-terminal text-xs">
      <span class="text-ink-dim">{{ store.fragmentsCount }}/{{ TOTAL_FRAGMENTS }}</span>
      <span class="text-primary">{{ formatted }}</span>
    </div>
  </header>
</template>
