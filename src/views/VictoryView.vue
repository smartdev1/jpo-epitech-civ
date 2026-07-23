<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore, FINAL_WORD } from '@/stores/game'
import { FRAGMENTS } from '@/data/fragments'
import MatrixRain from '@/components/effects/MatrixRain.vue'
import ParticleField from '@/components/effects/ParticleField.vue'
import GlitchText from '@/components/effects/GlitchText.vue'
import NeonButton from '@/components/ui/NeonButton.vue'
import { vibrateSuccess } from '@/utils/haptics'

const router = useRouter()
const store = useGameStore()

type Phase = 'checklist' | 'connecting' | 'revealing' | 'celebrate'
const phase = ref<Phase>('checklist')
const checkedLines = ref<string[]>([])

function padLine(key: string): string {
  const dots = '.'.repeat(Math.max(3, 16 - key.length))
  return `${key} ${dots} OK`
}

onMounted(() => {
  let i = 0
  const revealNext = () => {
    if (i < FRAGMENTS.length) {
      checkedLines.value.push(padLine(FRAGMENTS[i]!.key))
      i++
      setTimeout(revealNext, 450)
    } else {
      setTimeout(() => (phase.value = 'connecting'), 500)
    }
  }
  setTimeout(revealNext, 400)
})

function onConnectingDone() {
  setTimeout(() => (phase.value = 'revealing'), 1600)
}

function onRevealingDone() {
  setTimeout(() => {
    phase.value = 'celebrate'
    vibrateSuccess()
  }, 2200)
}

const elapsedLabel = computed(() => {
  if (!store.startTime) return '00:00'
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(store.startTime).getTime()) / 1000))
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
})

function restart() {
  store.resetGame()
  router.push({ name: 'splash' })
}

// Trigger the phase progression chain
watch(phase, (p) => {
  if (p === 'connecting') onConnectingDone()
  if (p === 'revealing') onRevealingDone()
})
</script>

<template>
  <main class="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-10">
    <MatrixRain v-if="phase === 'celebrate'" :opacity="0.22" />
    <ParticleField v-if="phase === 'celebrate'" />

    <transition name="fade-slide" mode="out-in">
      <div v-if="phase === 'checklist'" key="checklist" class="relative z-10 w-full max-w-sm">
        <div class="glass-panel hud-corner rounded-lg p-6 font-mono-terminal text-sm">
          <p v-for="line in checkedLines" :key="line" class="text-success text-glow-success">{{ line }}</p>
        </div>
      </div>

      <div v-else-if="phase === 'connecting'" key="connecting" class="relative z-10 text-center">
        <p class="font-mono-terminal text-lg uppercase tracking-widest text-primary text-glow-primary animate-pulse-glow">
          CONNEXION AU NOYAU CENTRAL...
        </p>
        <div class="mx-auto mt-8 h-24 w-24 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
      </div>

      <div v-else-if="phase === 'revealing'" key="revealing" class="relative z-10 text-center">
        <p class="mb-4 font-mono-terminal text-sm uppercase tracking-widest text-success text-glow-success">SYSTÈME RESTAURÉ</p>
        <p class="mb-2 font-mono-terminal text-xs uppercase tracking-widest text-ink-dim">Le concept final est :</p>
        <GlitchText :text="FINAL_WORD" active as="h1" class="font-display text-5xl tracking-[0.15em] text-primary text-glow-primary" />
      </div>

      <div v-else key="celebrate" class="relative z-10 flex w-full max-w-lg flex-col items-center gap-6 text-center">
        <div class="glass-panel hud-corner w-full rounded-2xl border border-primary/30 p-8">
          <h1 class="mb-3 font-display text-3xl uppercase tracking-wide text-primary text-glow-primary">MISSION ACCOMPLIE</h1>
          <p class="mb-1 text-ink">Félicitations agents.</p>
          <p class="mb-6 text-ink">Bienvenue dans l'univers EPITECH.</p>
          <div class="mb-6 flex justify-center gap-8 font-mono-terminal text-xs text-ink-dim">
            <span>ÉQUIPE: {{ store.team.teamName.toUpperCase() }}</span>
            <span>TEMPS: {{ elapsedLabel }}</span>
          </div>
          <NeonButton variant="primary" @click="restart">Nouvelle mission</NeonButton>
        </div>
      </div>
    </transition>
  </main>
</template>
