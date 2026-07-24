<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { MISSION_DURATION_SECONDS } from '@/types/game'
import { vibrateError } from '@/utils/haptics'
import MatrixRain from '@/components/effects/MatrixRain.vue'
import ScanlinesOverlay from '@/components/effects/ScanlinesOverlay.vue'
import GlitchText from '@/components/effects/GlitchText.vue'
import NeonButton from '@/components/ui/NeonButton.vue'

const store = useGameStore()
const router = useRouter()
const now = ref(Date.now())
let intervalId: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  intervalId = setInterval(() => (now.value = Date.now()), 1000)
})
onUnmounted(() => clearInterval(intervalId))

const remaining = computed(() => {
  if (!store.startTime) return MISSION_DURATION_SECONDS
  const elapsed = Math.floor((now.value - new Date(store.startTime).getTime()) / 1000)
  return Math.max(0, MISSION_DURATION_SECONDS - elapsed)
})

const isTimeUp = computed(() => Boolean(store.startTime) && !store.completed && remaining.value <= 0)

watch(isTimeUp, (triggered) => {
  if (triggered) vibrateError()
})

function restart() {
  store.resetGame()
  router.push({ name: 'splash' })
}
</script>

<template>
  <div
    v-if="isTimeUp"
    class="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden bg-background/95 px-6 text-center animate-hack-flicker"
  >
    <MatrixRain rgb="239, 68, 68" :opacity="0.28" />
    <ScanlinesOverlay />
    <div class="absolute inset-0 bg-error/10"></div>
    <div class="relative z-10 flex flex-col items-center gap-5 animate-screen-jitter">
      <GlitchText
        text="SYSTÈME COMPROMIS"
        as="h1"
        class="font-display text-2xl uppercase tracking-widest text-error text-glow-error animate-glitch-loop sm:text-3xl"
      />
      <p class="max-w-xs font-mono-terminal text-sm leading-relaxed text-ink-dim">
        TEMPS ÉCOULÉ.<br />
        Le noyau a été verrouillé par une intrusion.
      </p>
      <NeonButton variant="error" @click="restart">Réinitialiser la mission</NeonButton>
    </div>
  </div>
</template>
