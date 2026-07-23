<script setup lang="ts">
withDefaults(defineProps<{ text: string; active?: boolean; as?: string }>(), {
  active: false,
  as: 'span',
})
</script>

<template>
  <component :is="as" class="inline-block" :class="active ? 'glitch-active' : ''">{{ text }}</component>
</template>
