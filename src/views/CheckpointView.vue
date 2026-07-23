<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { FINAL_CHECKPOINT, TOTAL_FRAGMENTS } from '@/types/game'
import { vibrateError } from '@/utils/haptics'
import GlitchText from '@/components/effects/GlitchText.vue'
import ScanlinesOverlay from '@/components/effects/ScanlinesOverlay.vue'
import NeonButton from '@/components/ui/NeonButton.vue'

const route = useRoute()
const router = useRouter()
const store = useGameStore()

const denied = ref(false)

onMounted(() => {
  const step = parseInt(String(route.params.code), 10)

  if (!Number.isInteger(step) || step < 1 || step > FINAL_CHECKPOINT) {
    denied.value = true
    vibrateError()
    return
  }

  const granted = store.attemptCheckpoint(step)
  if (!granted) {
    denied.value = true
    vibrateError()
    return
  }

  if (step <= TOTAL_FRAGMENTS) {
    router.replace({ name: 'fragment', params: { id: step } })
  } else {
    router.replace({ name: 'final' })
  }
})

function backToDashboard() {
  router.replace({ name: 'dashboard' })
}
</script>

<template>
  <main class="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-error/5 px-6">
    <ScanlinesOverlay />
    <div v-if="denied" class="relative z-10 flex flex-col items-center gap-6 text-center">
      <GlitchText as="h1" text="ACCÈS REFUSÉ" active class="font-display text-3xl uppercase text-error text-glow-error" />
      <p class="max-w-xs font-mono-terminal text-sm text-ink-dim">
        Ce fragment est encore verrouillé.<br />Continuez votre progression.
      </p>
      <NeonButton variant="error" @click="backToDashboard">Retour à la mission</NeonButton>
    </div>
  </main>
</template>
