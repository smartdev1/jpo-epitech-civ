<script setup lang="ts">
import { onMounted, ref } from 'vue'
import QRCode from 'qrcode'
import { FRAGMENTS } from '@/data/fragments'
import { FINAL_CHECKPOINT } from '@/types/game'
import { checkpointUrl } from '@/utils/qr'

interface QrEntry {
  step: number
  label: string
  url: string
  dataUrl: string
}

const entries = ref<QrEntry[]>([])

function printPage() {
  window.print()
}

onMounted(async () => {
  const steps = [
    ...FRAGMENTS.map((f) => ({ step: f.id, label: `Fragment ${f.id} — ${f.key}` })),
    { step: FINAL_CHECKPOINT, label: 'QR Code final — Reconstruction' },
  ]

  entries.value = await Promise.all(
    steps.map(async ({ step, label }) => {
      const url = checkpointUrl(step)
      const dataUrl = await QRCode.toDataURL(url, { margin: 1, width: 320, color: { dark: '#09090B', light: '#FFFFFF' } })
      return { step, label, url, dataUrl }
    }),
  )
})
</script>

<template>
  <main class="min-h-dvh bg-white px-8 py-10 text-black print:px-0">
    <h1 class="mb-2 text-2xl font-bold">QR Codes — EPITECH_VOID</h1>
    <p class="mb-8 text-sm text-neutral-600">À imprimer et disposer dans la salle. Un QR par checkpoint, dans l'ordre de progression.</p>

    <button class="mb-8 border border-black px-4 py-2 text-sm font-semibold uppercase print:hidden" @click="printPage">
      Imprimer
    </button>

    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
      <div v-for="entry in entries" :key="entry.step" class="flex flex-col items-center gap-3 border border-neutral-300 p-6 text-center">
        <img :src="entry.dataUrl" :alt="entry.label" class="h-48 w-48" />
        <p class="font-semibold">{{ entry.label }}</p>
        <p class="break-all text-[10px] text-neutral-500">{{ entry.url }}</p>
      </div>
    </div>
  </main>
</template>
