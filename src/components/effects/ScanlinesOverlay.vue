<script setup lang="ts"></script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden z-0">
    <div class="absolute inset-0 opacity-[0.06]" style="background: repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 2px)"></div>
    <div class="absolute left-0 h-24 w-full bg-gradient-to-b from-primary/0 via-primary/10 to-primary/0 animate-scan"></div>
  </div>
</template>
