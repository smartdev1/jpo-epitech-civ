<script setup lang="ts">
interface Particle {
  left: string
  size: string
  delay: string
  duration: string
  color: string
}

const colors = ['bg-primary/40', 'bg-accent/40', 'bg-primary/20']

const particles: Particle[] = Array.from({ length: 18 }, (_, i) => ({
  left: `${Math.round(Math.random() * 100)}%`,
  size: `${2 + Math.round(Math.random() * 3)}px`,
  delay: `${(Math.random() * 6).toFixed(2)}s`,
  duration: `${(5 + Math.random() * 5).toFixed(2)}s`,
  color: colors[i % colors.length]!,
}))
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <span
      v-for="(p, i) in particles"
      :key="i"
      class="absolute bottom-0 rounded-full animate-float"
      :class="p.color"
      :style="{ left: p.left, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.duration }"
    ></span>
  </div>
</template>
