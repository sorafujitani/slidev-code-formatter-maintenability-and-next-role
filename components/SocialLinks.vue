<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  github?: string
  x?: string
  twitter?: string
  linkedin?: string
  website?: string
  variant?: 'icon' | 'text'
  size?: string
  gap?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'icon',
  size: '2xl',
  gap: 2,
})

const sizeClass = computed(() => `text-${props.size}`)
const gapClass = computed(() => `gap-${props.gap}`)
const xUsername = computed(() => props.x ?? props.twitter)
</script>

<template>
  <div
    class="social-links"
    :class="[
      variant === 'text' ? 'social-links-text' : 'social-links-icon flex',
      variant === 'icon' ? gapClass : '',
      variant === 'icon' ? sizeClass : '',
    ]"
  >
    <a
      v-if="github"
      :href="`https://github.com/${github}`"
      target="_blank"
      :class="variant === 'icon' ? 'slidev-icon-btn' : ''"
      aria-label="GitHub"
    >
      <carbon-logo-github />
      <span v-if="variant === 'text'">github.com/{{ github }}</span>
    </a>
    <a
      v-if="xUsername"
      :href="`https://x.com/${xUsername}`"
      target="_blank"
      :class="variant === 'icon' ? 'slidev-icon-btn' : ''"
      aria-label="X"
    >
      <carbon-logo-x />
      <span v-if="variant === 'text'">x.com/{{ xUsername }}</span>
    </a>
    <a
      v-if="linkedin"
      :href="`https://linkedin.com/in/${linkedin}`"
      target="_blank"
      :class="variant === 'icon' ? 'slidev-icon-btn' : ''"
      aria-label="LinkedIn"
    >
      <carbon-logo-linkedin />
      <span v-if="variant === 'text'">linkedin.com/in/{{ linkedin }}</span>
    </a>
    <a
      v-if="website"
      :href="website"
      target="_blank"
      :class="variant === 'icon' ? 'slidev-icon-btn' : ''"
      aria-label="Website"
    >
      <carbon-globe />
      <span v-if="variant === 'text'">{{ website.replace(/^https?:\/\//, '').replace(/\/$/, '') }}</span>
    </a>
  </div>
</template>

<style scoped>
.social-links a {
  transition: opacity 0.2s;
}

.social-links a:hover {
  opacity: 0.7;
}

.social-links-text {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  font-size: 1rem;
  font-weight: 650;
}

.social-links-text a {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.55rem;
  width: fit-content;
  border-bottom: 0 !important;
  color: var(--color-text);
  text-decoration: none;
}

.social-links-text svg {
  flex: 0 0 auto;
  font-size: 1.1rem;
  color: var(--color-accent);
}
</style>
