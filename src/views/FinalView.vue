<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { vibrateError } from '@/utils/haptics'
import HudCard from '@/components/ui/HudCard.vue'
import NeonButton from '@/components/ui/NeonButton.vue'
import TypewriterText from '@/components/effects/TypewriterText.vue'
import ScanlinesOverlay from '@/components/effects/ScanlinesOverlay.vue'
import ParticleField from '@/components/effects/ParticleField.vue'

const router = useRouter()
const store = useGameStore()

const showForm = ref(false)
const answers = ref(['', '', '', '', ''])
const error = ref('')
const shake = ref(false)

const labels = ['Fragment 1', 'Fragment 2', 'Fragment 3', 'Fragment 4', 'Fragment 5']

function revealForm() {
  showForm.value = true
}

function submit() {
  const ok = store.submitFinal(answers.value)
  if (ok) {
    router.push({ name: 'victory' })
  } else {
    error.value = 'ANALYSE INCOMPLÈTE\nCertains fragments sont incorrects.\nRéessayez.'
    vibrateError()
    shake.value = true
    setTimeout(() => (shake.value = false), 400)
  }
}
</script>

<template>
  <main class="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-10">
    <ParticleField />
    <ScanlinesOverlay />

    <div class="relative z-10 w-full max-w-md">
      <HudCard label="RECONSTRUCTION_SYSTEME">
        <p class="min-h-[3rem] font-mono-terminal text-sm text-primary text-glow-primary">
          <TypewriterText :text="'ANALYSE DES FRAGMENTS...\n5 fragments détectés.'" :speed="30" @done="revealForm" />
        </p>

        <transition name="fade-slide">
          <form v-if="showForm" class="mt-6 flex flex-col gap-4" :class="shake ? 'animate-glitch' : ''" @submit.prevent="submit">
            <label v-for="(label, i) in labels" :key="label" class="block">
              <span class="mb-1 block font-mono-terminal text-[10px] uppercase tracking-widest text-ink-dim">{{ label }}</span>
              <input
                v-model="answers[i]"
                type="text"
                class="w-full border-b-2 border-white/15 bg-transparent pb-2 font-mono-terminal text-base uppercase tracking-widest text-primary placeholder:text-ink-dim/30 focus:border-primary focus:outline-none"
              />
            </label>

            <p v-if="error" class="whitespace-pre-line font-mono-terminal text-xs text-error text-glow-error">{{ error }}</p>

            <NeonButton type="submit" variant="accent">Analyser les fragments</NeonButton>
          </form>
        </transition>
      </HudCard>
    </div>
  </main>
</template>
