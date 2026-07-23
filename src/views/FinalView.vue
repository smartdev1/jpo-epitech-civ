<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { FRAGMENTS } from '@/data/fragments'
import { vibrateError } from '@/utils/haptics'
import HudCard from '@/components/ui/HudCard.vue'
import NeonButton from '@/components/ui/NeonButton.vue'
import TypewriterText from '@/components/effects/TypewriterText.vue'
import ScanlinesOverlay from '@/components/effects/ScanlinesOverlay.vue'
import ParticleField from '@/components/effects/ParticleField.vue'

const router = useRouter()
const store = useGameStore()

type Phase = 'intro' | 'form' | 'checklist' | 'masterkey'
const phase = ref<Phase>('intro')

const answers = ref(['', '', '', '', ''])
const formError = ref('')
const shake = ref(false)
const labels = ['Fragment 1', 'Fragment 2', 'Fragment 3', 'Fragment 4', 'Fragment 5']

const checkedLines = ref<string[]>([])

const masterKey = ref('')
const masterKeyError = ref('')
const masterKeyShake = ref(false)

function revealForm() {
  phase.value = 'form'
}

function submitFragments() {
  const ok = store.verifyFragments(answers.value)
  if (ok) {
    formError.value = ''
    phase.value = 'checklist'
    runChecklist()
  } else {
    formError.value = 'ANALYSE INCOMPLÈTE\nCertains fragments sont incorrects.\nRéessayez.'
    vibrateError()
    shake.value = true
    setTimeout(() => (shake.value = false), 400)
  }
}

function padLine(key: string): string {
  const dots = '.'.repeat(Math.max(3, 16 - key.length))
  return `${key} ${dots} OK`
}

function runChecklist() {
  let i = 0
  const revealNext = () => {
    if (i < FRAGMENTS.length) {
      checkedLines.value.push(padLine(FRAGMENTS[i]!.key))
      i++
      setTimeout(revealNext, 400)
    } else {
      setTimeout(() => (phase.value = 'masterkey'), 700)
    }
  }
  setTimeout(revealNext, 300)
}

function submitMasterKey() {
  const ok = store.submitMasterKey(masterKey.value)
  if (ok) {
    router.push({ name: 'victory' })
  } else {
    masterKeyError.value = 'MOT-CLÉ INCORRECT. RÉESSAYEZ.'
    vibrateError()
    masterKeyShake.value = true
    setTimeout(() => (masterKeyShake.value = false), 400)
  }
}
</script>

<template>
  <main class="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-10">
    <ParticleField />
    <ScanlinesOverlay />

    <div class="relative z-10 w-full max-w-md">
      <transition name="fade-slide" mode="out-in">
        <HudCard v-if="phase === 'intro' || phase === 'form'" key="form" label="RECONSTRUCTION_SYSTEME">
          <p class="min-h-[3rem] font-mono-terminal text-sm text-primary text-glow-primary">
            <TypewriterText :text="'ANALYSE DES FRAGMENTS...\n5 fragments détectés.'" :speed="30" @done="revealForm" />
          </p>

          <transition name="fade-slide">
            <form v-if="phase === 'form'" class="mt-6 flex flex-col gap-4" :class="shake ? 'animate-glitch' : ''" @submit.prevent="submitFragments">
              <label v-for="(label, i) in labels" :key="label" class="block">
                <span class="mb-1 block font-mono-terminal text-[10px] uppercase tracking-widest text-ink-dim">{{ label }}</span>
                <input
                  v-model="answers[i]"
                  type="text"
                  class="w-full border-b-2 border-white/15 bg-transparent pb-2 font-mono-terminal text-base uppercase tracking-widest text-primary placeholder:text-ink-dim/30 focus:border-primary focus:outline-none"
                />
              </label>

              <p v-if="formError" class="whitespace-pre-line font-mono-terminal text-xs text-error text-glow-error">{{ formError }}</p>

              <NeonButton type="submit" variant="accent">Analyser les fragments</NeonButton>
            </form>
          </transition>
        </HudCard>

        <div v-else-if="phase === 'checklist'" key="checklist" class="glass-panel hud-corner rounded-lg p-6 font-mono-terminal text-sm">
          <p v-for="line in checkedLines" :key="line" class="text-success text-glow-success">{{ line }}</p>
        </div>

        <HudCard v-else key="masterkey" label="NOYAU_SYSTEME">
          <p class="mb-1 font-mono-terminal text-sm uppercase tracking-widest text-primary text-glow-primary">ANALYSE TERMINÉE.</p>
          <p class="mb-4 font-mono-terminal text-xs uppercase tracking-widest text-ink-dim">
            Entrez le mot-clé qui restaure le noyau du système.
          </p>

          <form class="flex flex-col gap-4" :class="masterKeyShake ? 'animate-glitch' : ''" @submit.prevent="submitMasterKey">
            <input
              v-model="masterKey"
              type="text"
              placeholder="MOT-CLÉ..."
              class="w-full border-b-2 border-white/15 bg-transparent pb-2 text-center font-mono-terminal text-xl uppercase tracking-[0.2em] text-primary placeholder:text-ink-dim/30 focus:border-primary focus:outline-none"
            />
            <p class="text-center font-mono-terminal text-xs italic text-ink-dim">
              Indice : qu'est-ce que le CODE, le PROGRAMME, le BUG, le LANGAGE et l'ALGORITHME ont en commun ?
            </p>
            <p v-if="masterKeyError" class="text-center font-mono-terminal text-xs text-error text-glow-error">{{ masterKeyError }}</p>
            <NeonButton type="submit" variant="primary">Restaurer le noyau</NeonButton>
          </form>
        </HudCard>
      </transition>
    </div>
  </main>
</template>
