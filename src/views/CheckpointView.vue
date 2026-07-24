<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { getFragmentById } from '@/data/fragments'
import { FINAL_CHECKPOINT, TOTAL_FRAGMENTS, type Fragment } from '@/types/game'
import { vibrateError } from '@/utils/haptics'
import GlitchText from '@/components/effects/GlitchText.vue'
import ScanlinesOverlay from '@/components/effects/ScanlinesOverlay.vue'
import ParticleField from '@/components/effects/ParticleField.vue'
import NeonButton from '@/components/ui/NeonButton.vue'
import FragmentSuccessCard from '@/components/FragmentSuccessCard.vue'

const route = useRoute()
const router = useRouter()
const store = useGameStore()

const denied = ref(false)
const scanRequired = ref(false)
const recapFragment = ref<Fragment | null>(null)

onMounted(() => {
  const step = parseInt(String(route.params.code), 10)

  if (!Number.isInteger(step) || step < 1 || step > FINAL_CHECKPOINT) {
    denied.value = true
    vibrateError()
    return
  }

  // Already-decrypted fragment: free reminder of its hint, no token required.
  if (step <= TOTAL_FRAGMENTS) {
    const fragment = getFragmentById(step)
    if (fragment && store.fragmentsFound.includes(fragment.key)) {
      recapFragment.value = fragment
      return
    }
  }

  const granted = store.attemptCheckpoint(step)
  if (!granted) {
    denied.value = true
    vibrateError()
    return
  }

  const token = typeof route.query.t === 'string' ? route.query.t : ''
  if (!store.consumeScanToken(step, token)) {
    denied.value = true
    scanRequired.value = true
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
  <main v-if="recapFragment" class="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-10">
    <ParticleField />
    <FragmentSuccessCard :fragment="recapFragment" @back="backToDashboard" />
  </main>

  <main v-else class="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-error/5 px-6">
    <ScanlinesOverlay />
    <div v-if="denied" class="relative z-10 flex flex-col items-center gap-6 text-center">
      <GlitchText as="h1" text="ACCÈS REFUSÉ" active class="font-display text-3xl uppercase text-error text-glow-error" />
      <p class="max-w-xs font-mono-terminal text-sm text-ink-dim">
        <template v-if="scanRequired">
          Ce fragment doit être déverrouillé en le scannant avec le scanner de la mission.
        </template>
        <template v-else> Ce fragment est encore verrouillé.<br />Continuez votre progression. </template>
      </p>
      <NeonButton variant="error" @click="backToDashboard">Retour à la mission</NeonButton>
    </div>
  </main>
</template>
