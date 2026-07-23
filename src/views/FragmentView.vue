<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { getFragmentById } from '@/data/fragments'
import { TOTAL_FRAGMENTS } from '@/types/game'
import { vibrateError, vibrateSuccess } from '@/utils/haptics'
import MissionHeader from '@/components/ui/MissionHeader.vue'
import HudCard from '@/components/ui/HudCard.vue'
import NeonButton from '@/components/ui/NeonButton.vue'
import TypewriterText from '@/components/effects/TypewriterText.vue'
import ParticleField from '@/components/effects/ParticleField.vue'
import { PUZZLE_ICONS } from '@/components/puzzle-icons'

const route = useRoute()
const router = useRouter()
const store = useGameStore()

const fragmentId = computed(() => Number(route.params.id))
const fragment = computed(() => getFragmentById(fragmentId.value)!)

const answer = ref('')
const shake = ref(false)
const wrongMessage = ref('')
const success = ref(false)

function submit() {
  if (!answer.value.trim()) return
  const correct = store.submitFragmentAnswer(fragment.value.id, answer.value)
  if (correct) {
    success.value = true
    vibrateSuccess()
  } else {
    wrongMessage.value = 'RÉPONSE INCORRECTE. RÉESSAYEZ.'
    vibrateError()
    shake.value = true
    setTimeout(() => (shake.value = false), 400)
  }
}

function backToDashboard() {
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <main class="relative min-h-dvh overflow-hidden pb-16 pt-24">
    <ParticleField />
    <MissionHeader />

    <div class="relative z-10 mx-auto flex max-w-2xl flex-col gap-6 px-5">
      <div class="flex items-end justify-between border-l-2 border-primary pl-4">
        <div>
          <p class="font-mono-terminal text-[10px] uppercase tracking-widest text-primary/70">Décryptage en cours</p>
          <h1 class="font-display text-xl text-primary">FRAGMENT {{ fragment.id.toString().padStart(2, '0') }}/{{ TOTAL_FRAGMENTS }}</h1>
        </div>
        <p class="font-mono-terminal text-[10px] uppercase text-ink-dim">{{ fragment.title }}</p>
      </div>

      <HudCard label="SYSTEM_LOG">
        <p v-if="fragment.type !== 'images' && fragment.type !== 'rebus'" class="font-mono-terminal text-sm leading-relaxed text-ink">
          <TypewriterText :text="fragment.prompt" :speed="24" />
        </p>
        <p v-else class="font-mono-terminal text-sm leading-relaxed text-ink">{{ fragment.prompt }}</p>

        <div v-if="fragment.type === 'images' && fragment.images" class="mt-4 grid grid-cols-2 gap-3">
          <div v-for="img in fragment.images" :key="img.label" class="flex flex-col items-center gap-2 border border-white/10 bg-surface/60 py-6">
            <component :is="PUZZLE_ICONS[img.iconKey]" class="h-12 w-12 text-primary" />
            <span class="font-mono-terminal text-[10px] uppercase text-ink-dim">{{ img.label }}</span>
          </div>
        </div>

        <div v-if="fragment.type === 'rebus' && fragment.rebus" class="mt-4 flex items-center justify-center gap-6 py-6">
          <template v-for="(iconKey, i) in fragment.rebus" :key="i">
            <component :is="PUZZLE_ICONS[iconKey]" class="h-16 w-16 text-primary" />
            <span v-if="i < fragment.rebus.length - 1" class="font-display text-2xl text-accent">+</span>
          </template>
        </div>
      </HudCard>

      <div class="flex flex-col gap-3" :class="shake ? 'animate-glitch' : ''">
        <label class="block">
          <span class="mb-1 block font-mono-terminal text-[10px] uppercase tracking-widest text-ink-dim">Réponse</span>
          <input
            v-model="answer"
            type="text"
            placeholder="ENTRER LE MOT..."
            class="w-full border-b-2 border-white/15 bg-transparent pb-2 font-mono-terminal text-xl uppercase tracking-widest text-primary placeholder:text-ink-dim/30 focus:border-primary focus:outline-none"
            @keyup.enter="submit"
          />
        </label>
        <p v-if="wrongMessage" class="font-mono-terminal text-xs text-error text-glow-error">{{ wrongMessage }}</p>
        <NeonButton variant="primary" @click="submit">Valider</NeonButton>
      </div>
    </div>

    <transition name="fade-slide">
      <div v-if="success" class="fixed inset-0 z-[95] flex items-center justify-center bg-background/95 px-6 backdrop-blur-md">
        <div class="glass-panel hud-corner w-full max-w-md rounded-2xl border border-success/30 p-8 text-center">
          <p class="mb-2 font-mono-terminal text-xs uppercase tracking-widest text-success">FRAGMENT RETROUVÉ</p>
          <h2 class="mb-1 font-display text-4xl tracking-[0.2em] text-success text-glow-success">{{ fragment.key }}</h2>
          <p class="mb-6 font-mono-terminal text-sm text-primary">{{ fragment.successPercent }}% DU SYSTÈME RESTAURÉ</p>
          <div class="mb-6 h-1.5 w-full overflow-hidden bg-white/10">
            <div class="h-full bg-success shadow-[0_0_12px_rgba(34,197,94,0.7)] transition-all" :style="{ width: fragment.successPercent + '%' }"></div>
          </div>
          <p class="mb-8 whitespace-pre-line font-mono-terminal text-xs italic leading-relaxed text-ink-dim">{{ fragment.hint }}</p>
          <NeonButton variant="success" @click="backToDashboard">Retourner au HUD</NeonButton>
        </div>
      </div>
    </transition>
  </main>
</template>
