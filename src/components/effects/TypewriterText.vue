<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{ text: string; speed?: number; cursor?: boolean; startDelay?: number }>(), {
  speed: 45,
  cursor: true,
  startDelay: 0,
})

const emit = defineEmits<{ done: [] }>()

const displayed = ref('')
let timeoutId: ReturnType<typeof setTimeout> | undefined
let cancelled = false

function type(index: number) {
  if (cancelled) return
  if (index >= props.text.length) {
    emit('done')
    return
  }
  displayed.value += props.text[index]
  timeoutId = setTimeout(() => type(index + 1), props.speed)
}

function start() {
  displayed.value = ''
  cancelled = false
  timeoutId = setTimeout(() => type(0), props.startDelay)
}

onMounted(start)
watch(() => props.text, start)

onUnmounted(() => {
  cancelled = true
  clearTimeout(timeoutId)
})
</script>

<template>
  <span class="whitespace-pre-line" :class="cursor ? 'terminal-cursor' : ''">{{ displayed }}</span>
</template>
