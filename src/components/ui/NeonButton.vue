<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'accent' | 'ghost' | 'success' | 'error'
    disabled?: boolean
    type?: 'button' | 'submit'
  }>(),
  { variant: 'primary', disabled: false, type: 'button' },
)

defineEmits<{ click: [MouseEvent] }>()

const styles: Record<string, string> = {
  primary: 'border-primary text-primary hover:bg-primary/10 shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_28px_rgba(0,229,255,0.45)]',
  accent: 'border-accent text-accent hover:bg-accent/10 shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:shadow-[0_0_28px_rgba(139,92,246,0.45)]',
  ghost: 'border-white/15 text-ink hover:bg-white/5',
  success: 'border-success text-success hover:bg-success/10 shadow-[0_0_20px_rgba(34,197,94,0.25)]',
  error: 'border-error text-error hover:bg-error/10 shadow-[0_0_20px_rgba(239,68,68,0.25)]',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="relative flex h-14 w-full items-center justify-center gap-2 border-2 bg-transparent px-6 font-mono-terminal text-sm font-medium uppercase tracking-[0.2em] transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
    :class="styles[variant]"
    @click="(e: MouseEvent) => $emit('click', e)"
  >
    <slot />
  </button>
</template>
