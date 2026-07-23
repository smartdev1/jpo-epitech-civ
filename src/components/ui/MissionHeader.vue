<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useGameStore } from '@/stores/game'
import { CRITICAL_TIME_SECONDS, MISSION_DURATION_SECONDS, TOTAL_FRAGMENTS } from '@/types/game'

const store = useGameStore()
const now = ref(Date.now())
let intervalId: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  intervalId = setInterval(() => (now.value = Date.now()), 1000)
})
onUnmounted(() => clearInterval(intervalId))

const remaining = computed(() => {
  if (!store.startTime) return MISSION_DURATION_SECONDS
  const elapsed = Math.floor((now.value - new Date(store.startTime).getTime()) / 1000)
  return Math.min(MISSION_DURATION_SECONDS, Math.max(0, MISSION_DURATION_SECONDS - elapsed))
})

const formatted = computed(() => {
  const minutes = Math.floor(remaining.value / 60)
  const seconds = remaining.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const isCritical = computed(() => remaining.value <= CRITICAL_TIME_SECONDS)
</script>

<template>
  <header class="fixed top-0 z-40 flex h-16 w-full items-center justify-between border-b border-primary/20 bg-surface/70 px-4 backdrop-blur-xl shadow-[0_0_15px_rgba(0,229,255,0.08)]">
    <div class="flex items-center gap-2 font-mono-terminal text-[11px] uppercase tracking-widest text-primary">
      <span class="text-primary">&gt;_</span>
      <span>MISSION: EPITECH_VOID</span>
    </div>
    <div class="flex items-center gap-4 font-mono-terminal text-xs">
      <span class="text-ink-dim">{{ store.fragmentsCount }}/{{ TOTAL_FRAGMENTS }}</span>
      <span :class="isCritical ? 'inline-block text-error animate-timer-alert' : 'text-primary'">{{ formatted }}</span>
    </div>
  </header>
</template>
