<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import ParticleField from '@/components/effects/ParticleField.vue'
import HudCard from '@/components/ui/HudCard.vue'
import NeonButton from '@/components/ui/NeonButton.vue'

const router = useRouter()
const store = useGameStore()

const teamName = ref('')
const players = ref(4)
const error = ref('')

function submit() {
  const name = teamName.value.trim()
  if (!name) {
    error.value = 'Le nom d’équipe est requis.'
    return
  }
  if (players.value < 3 || players.value > 6) {
    error.value = 'Le nombre de participants doit être entre 3 et 6.'
    return
  }
  error.value = ''
  store.createTeam(name, players.value)
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <main class="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-10">
    <ParticleField />

    <div class="relative z-10 w-full max-w-md">
      <p class="mb-6 text-center font-mono-terminal text-[11px] uppercase tracking-widest text-primary">Enregistrement de l'équipe</p>

      <HudCard label="IDENTIFICATION_EQUIPE">
        <form class="flex flex-col gap-6" @submit.prevent="submit">
          <label class="block">
            <span class="mb-1 block font-mono-terminal text-[10px] uppercase tracking-widest text-ink-dim">Nom de l'équipe</span>
            <input
              v-model="teamName"
              type="text"
              maxlength="24"
              placeholder="EX: NULL_POINTER"
              class="w-full border-b-2 border-white/15 bg-transparent pb-2 font-mono-terminal text-lg uppercase text-primary placeholder:text-ink-dim/40 focus:border-primary focus:outline-none"
            />
          </label>

          <label class="block">
            <span class="mb-1 block font-mono-terminal text-[10px] uppercase tracking-widest text-ink-dim">Nombre de participants (3 à 6)</span>
            <input
              v-model.number="players"
              type="number"
              min="3"
              max="6"
              class="w-full border-b-2 border-white/15 bg-transparent pb-2 font-mono-terminal text-lg text-primary focus:border-primary focus:outline-none"
            />
          </label>

          <p v-if="error" class="font-mono-terminal text-xs text-error text-glow-error">{{ error }}</p>

          <NeonButton type="submit" variant="primary">Rejoindre la mission</NeonButton>
        </form>
      </HudCard>
    </div>
  </main>
</template>
