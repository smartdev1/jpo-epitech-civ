<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import ParticleField from '@/components/effects/ParticleField.vue'
import ScanlinesOverlay from '@/components/effects/ScanlinesOverlay.vue'
import NeonButton from '@/components/ui/NeonButton.vue'

const router = useRouter()
const store = useGameStore()

const BOOT_LINES = ['INITIALISATION DU SYSTÈME...', 'CONNEXION AU NOYAU EPITECH...']

const bootLines = ref<string[]>([])
const progress = ref(0)
const phase = ref<'boot' | 'narrative'>('boot')

onMounted(() => {
  let lineIndex = 0
  const revealLine = () => {
    if (lineIndex < BOOT_LINES.length) {
      bootLines.value.push(BOOT_LINES[lineIndex]!)
      lineIndex++
      setTimeout(revealLine, 650)
    } else {
      animateProgress()
    }
  }
  setTimeout(revealLine, 400)
})

function animateProgress() {
  const intervalId = setInterval(() => {
    progress.value = Math.min(100, progress.value + 4)
    if (progress.value >= 100) {
      clearInterval(intervalId)
      setTimeout(() => (phase.value = 'narrative'), 500)
    }
  }, 40)
}

function startMission() {
  if (store.team.teamName) {
    router.push({ name: 'dashboard' })
  } else {
    router.push({ name: 'team-setup' })
  }
}

const progressBlocks = () => {
  const filled = Math.round(progress.value / 100 * 24)
  return '█'.repeat(filled) + '░'.repeat(24 - filled)
}
</script>

<template>
  <main class="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-10">
    <ParticleField />
    <ScanlinesOverlay />

    <div class="relative z-10 flex w-full max-w-md flex-col items-center text-center">
      <div class="mb-8 flex items-center gap-2 font-mono-terminal text-sm uppercase tracking-[0.3em] text-primary animate-pulse-glow">
        <span>&gt;_</span>
        <span>EPITECH_VOID</span>
      </div>

      <div class="glass-panel hud-corner mb-8 min-h-[9rem] w-full rounded-lg p-5 text-left">
        <p v-for="line in bootLines" :key="line" class="font-mono-terminal text-sm text-primary text-glow-primary">
          {{ line }}
        </p>
        <p v-if="bootLines.length === BOOT_LINES.length" class="mt-2 font-mono-terminal text-sm tracking-widest text-primary">
          {{ progressBlocks() }} {{ progress }}%
        </p>
        <p v-if="phase === 'narrative'" class="mt-2 font-mono-terminal text-sm text-success text-glow-success">MISSION ACTIVÉE</p>
      </div>

      <transition name="fade-slide">
        <div v-if="phase === 'narrative'" class="flex w-full flex-col items-center gap-8">
          <p class="font-display text-base leading-relaxed text-ink-dim">
            Une intelligence artificielle est compromise.<br />
            5 fragments informatiques ont été dispersés.<br />
            Retrouvez-les afin de restaurer le système.
          </p>
          <NeonButton variant="primary" @click="startMission">▶ Démarrer la mission</NeonButton>
        </div>
      </transition>
    </div>
  </main>
</template>
