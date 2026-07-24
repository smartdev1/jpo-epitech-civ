<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { FRAGMENTS } from '@/data/fragments'
import { TOTAL_FRAGMENTS } from '@/types/game'
import MissionHeader from '@/components/ui/MissionHeader.vue'
import HudCard from '@/components/ui/HudCard.vue'
import ParticleField from '@/components/effects/ParticleField.vue'
import QrScannerModal from '@/components/QrScannerModal.vue'

const router = useRouter()
const store = useGameStore()
const showScanner = ref(false)
const showResetConfirm = ref(false)

onMounted(() => store.startMission())

const progressBlocks = computed(() =>
  Array.from({ length: TOTAL_FRAGMENTS }, (_, i) => i < store.fragmentsCount),
)

function statusOf(fragmentId: number, key: string): 'done' | 'current' | 'locked' {
  if (store.fragmentsFound.includes(key)) return 'done'
  if (store.currentStep === fragmentId) return 'current'
  return 'locked'
}

function onScanned(step: number) {
  showScanner.value = false
  const code = step.toString().padStart(3, '0')
  router.push({ name: 'checkpoint', params: { code } })
}

function confirmReset() {
  store.resetGame()
  showResetConfirm.value = false
  router.push({ name: 'splash' })
}
</script>

<template>
  <main class="relative min-h-dvh overflow-hidden pb-28 pt-24">
    <ParticleField />
    <MissionHeader />

    <div class="relative z-10 mx-auto flex max-w-2xl flex-col gap-6 px-5">
      <HudCard label="MISSION_IA">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-mono-terminal text-[10px] uppercase tracking-widest text-ink-dim">Progression système</p>
            <div class="mt-2 flex gap-1.5">
              <span
                v-for="(filled, i) in progressBlocks"
                :key="i"
                class="h-4 w-4 border"
                :class="filled ? 'border-primary bg-primary/70 shadow-[0_0_8px_rgba(0,229,255,0.7)]' : 'border-white/20 bg-transparent'"
              ></span>
            </div>
          </div>
          <div class="text-right">
            <p class="font-display text-2xl text-primary">{{ store.fragmentsCount }}/{{ TOTAL_FRAGMENTS }}</p>
            <p class="font-mono-terminal text-[10px] uppercase text-ink-dim">Fragments</p>
          </div>
        </div>
      </HudCard>

      <HudCard label="FRAGMENTS_RECUPERES">
        <ul class="flex flex-col divide-y divide-white/5">
          <li v-for="fragment in FRAGMENTS" :key="fragment.id" class="flex items-center justify-between py-3">
            <span
              class="font-mono-terminal text-sm uppercase tracking-widest"
              :class="{
                'text-success text-glow-success': statusOf(fragment.id, fragment.key) === 'done',
                'text-primary animate-pulse-glow': statusOf(fragment.id, fragment.key) === 'current',
                'text-ink-dim/50': statusOf(fragment.id, fragment.key) === 'locked',
              }"
            >
              <template v-if="statusOf(fragment.id, fragment.key) === 'done'">{{ fragment.key }}</template>
              <template v-else>FRAGMENT {{ fragment.id.toString().padStart(2, '0') }}</template>
            </span>
            <span class="font-mono-terminal text-xs">
              <span v-if="statusOf(fragment.id, fragment.key) === 'done'" class="text-success">✓ RESTAURÉ</span>
              <span v-else-if="statusOf(fragment.id, fragment.key) === 'current'" class="text-primary">● NON DÉCRYPTÉ</span>
              <span v-else class="text-ink-dim/50">🔒 VERROUILLÉ</span>
            </span>
          </li>
        </ul>
      </HudCard>

      <HudCard label="LOGS_SYSTEME">
        <div class="flex flex-col gap-1 font-mono-terminal text-[11px] text-ink-dim">
          <p class="text-primary/60">[SYS] HANDSHAKE ÉTABLI...</p>
          <p>[SYS] ÉQUIPE : {{ store.team.teamName.toUpperCase() }}</p>
          <p v-if="store.attempts > 0" class="text-error/70">[WARN] {{ store.attempts }} TENTATIVE(S) ENREGISTRÉE(S)</p>
        </div>
      </HudCard>

      <button
        class="self-center font-mono-terminal text-[10px] uppercase tracking-widest text-ink-dim/60 underline underline-offset-4"
        @click="showResetConfirm = true"
      >
        Réinitialiser la mission
      </button>
    </div>

    <div class="fixed bottom-8 right-6 z-40 flex items-center gap-3">
      <span class="rounded-full bg-surface/80 px-3 py-1.5 font-mono-terminal text-[10px] uppercase tracking-widest text-primary shadow-[0_0_15px_rgba(0,229,255,0.15)] backdrop-blur-sm">
        Clique pour scanner
      </span>
      <button
        class="flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary/60 bg-primary text-background shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-transform active:scale-90"
        @click="showScanner = true"
      >
        <span class="text-2xl">▣</span>
      </button>
    </div>

    <QrScannerModal v-if="showScanner" @close="showScanner = false" @scanned="onScanned" />

    <div v-if="showResetConfirm" class="fixed inset-0 z-[95] flex items-center justify-center bg-background/90 px-6 backdrop-blur-sm">
      <HudCard label="CONFIRMATION" class="w-full max-w-sm">
        <p class="mb-6 font-mono-terminal text-sm text-ink">Réinitialiser toute la progression de la mission ?</p>
        <div class="flex gap-3">
          <button class="h-12 flex-1 border-2 border-white/15 font-mono-terminal text-xs uppercase text-ink-dim" @click="showResetConfirm = false">
            Annuler
          </button>
          <button class="h-12 flex-1 border-2 border-error font-mono-terminal text-xs uppercase text-error" @click="confirmReset">
            Confirmer
          </button>
        </div>
      </HudCard>
    </div>
  </main>
</template>
