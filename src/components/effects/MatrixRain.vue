<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const props = withDefaults(defineProps<{ opacity?: number; density?: number; rgb?: string }>(), {
  opacity: 0.12,
  density: 18,
  rgb: '0, 229, 255',
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let frameId = 0
let resizeObserver: ResizeObserver | null = null

const CHARS = '01アイウエオカキクケコ01010101{}[]<>/;'

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let columns = 0
  const drops: number[] = []

  function setup() {
    canvas!.width = canvas!.clientWidth
    canvas!.height = canvas!.clientHeight
    columns = Math.floor(canvas!.width / props.density)
    drops.length = 0
    for (let i = 0; i < columns; i++) drops.push(Math.random() * -50)
  }

  function draw() {
    if (!ctx || !canvas) return
    ctx.fillStyle = 'rgba(9, 9, 11, 0.15)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = `rgba(${props.rgb}, ${props.opacity})`
    ctx.font = `${props.density - 4}px 'JetBrains Mono', monospace`
    for (let i = 0; i < drops.length; i++) {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)]!
      const y = drops[i]!
      ctx.fillText(char, i * props.density, y * props.density)
      if (y * props.density > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      } else {
        drops[i] = y + 1
      }
    }
    frameId = requestAnimationFrame(draw)
  }

  setup()
  draw()
  resizeObserver = new ResizeObserver(setup)
  resizeObserver.observe(canvas)
})

onUnmounted(() => {
  cancelAnimationFrame(frameId)
  resizeObserver?.disconnect()
})
</script>

<template>
  <canvas ref="canvasRef" class="pointer-events-none absolute inset-0 h-full w-full"></canvas>
</template>
