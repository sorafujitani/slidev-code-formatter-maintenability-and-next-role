<script setup lang="ts">
import { useNav } from '@slidev/client'

const { isPrintMode } = useNav()

interface Props {
  tag?: 'h1' | 'h2' | 'h3'
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'h1',
  animated: false,
})
</script>

<template>
  <component
    :is="tag"
    class="gradient-heading"
    :class="{ 'animated-shadow': animated, 'gradient-heading-print': isPrintMode }"
  >
    <slot />
  </component>
</template>

<style scoped>
/* PDFビューアーによる文字のマスク描画の差を避ける。 */
.gradient-heading-print {
  background: none !important;
  color: rgb(0 155 206);
  -webkit-text-fill-color: currentColor;
  animation: none;
}
</style>
