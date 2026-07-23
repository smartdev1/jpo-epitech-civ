<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'
import { parseCheckpoint } from '@/utils/qr'

const emit = defineEmits<{ close: []; scanned: [step: number] }>()

const READER_ID = 'qr-reader-viewport'
const error = ref('')
let scanner: Html5Qrcode | null = null
let handled = false

async function startScanner() {
  try {
    scanner = new Html5Qrcode(READER_ID)
    await scanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: 240 },
      (decodedText) => {
        if (handled) return
        const step = parseCheckpoint(decodedText)
        if (step !== null) {
          handled = true
          emit('scanned', step)
        }
      },
      () => {
        /* ignore per-frame decode misses */
      },
    )
  } catch {
    error.value = "Caméra inaccessible. Autorisez l'accès à la caméra pour scanner un fragment."
  }
}

onMounted(startScanner)

onUnmounted(() => {
  scanner
    ?.stop()
    .then(() => scanner?.clear())
    .catch(() => {})
})

function close() {
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 z-[90] flex flex-col bg-background/95 backdrop-blur-sm">
    <header class="flex h-16 items-center justify-between border-b border-primary/20 px-4">
      <span class="font-mono-terminal text-xs uppercase tracking-widest text-primary">SCANNER_FRAGMENT</span>
      <button class="font-mono-terminal text-xs uppercase text-ink-dim" @click="close">Fermer ✕</button>
    </header>
    <div class="relative flex-1">
      <div :id="READER_ID" class="h-full w-full [&_video]:h-full [&_video]:w-full [&_video]:object-cover"></div>
      <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div class="h-60 w-60 hud-corner border border-primary/30"></div>
      </div>
      <p v-if="error" class="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center font-mono-terminal text-sm text-error text-glow-error">
        {{ error }}
      </p>
    </div>
    <p class="p-4 text-center font-mono-terminal text-[11px] uppercase tracking-widest text-ink-dim">
      Visez le QR Code de la salle
    </p>
  </div>
</template>
