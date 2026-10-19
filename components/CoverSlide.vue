<script setup lang="ts">
import GradientHeading from './GradientHeading.vue'
import SocialLinks from './SocialLinks.vue'

interface Props {
  title: string
  subtitle?: string
  event?: string
  author?: string
  social?: {
    github?: string
    x?: string
    twitter?: string
    linkedin?: string
    website?: string
  }
  gradient?: boolean
  background?: 'plain' | 'cyanTop'
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  gradient: true,
  background: 'cyanTop',
  compact: false,
})
</script>

<template>
  <div
    class="cover-slide"
    :class="[
      background === 'cyanTop' ? 'cover-cyan-top' : 'cover-plain',
      compact ? 'cover-compact' : '',
    ]"
  >
    <div class="cover-content">
      <h1 v-if="!gradient" class="cover-title" v-html="title">
      </h1>
      <GradientHeading v-else tag="h1" class="cover-title" v-html="title">
      </GradientHeading>

      <div v-if="subtitle" class="mt-8 cover-subtitle">
        {{ subtitle }}
      </div>

      <div v-if="event || author" class="mt-16 cover-meta">
        <span v-if="event">{{ event }}</span>
        <span v-if="event && author"> / </span>
        <span v-if="author">{{ author }}</span>
      </div>
    </div>

    <div v-if="social" class="cover-social">
      <SocialLinks
        :github="social.github"
        :x="social.x"
        :twitter="social.twitter"
        :linkedin="social.linkedin"
        :website="social.website"
        size="xl"
      />
    </div>
  </div>
</template>

<style>
/* グローバルスタイル：CoverSlideを含むスライドのレイアウトをリセット */
.slidev-layout:has(.cover-slide) {
  padding: 0 !important;
}

.slidev-page:has(.cover-slide) {
  border-radius: 0 !important;
  overflow: hidden;
}

.slidev-page:has(.cover-slide.cover-cyan-top) {
  background:
    radial-gradient(
      ellipse 132% 72% at 50% -14%,
      rgb(118 220 232 / 0.9) 0%,
      rgb(178 234 241 / 0.68) 48%,
      transparent 78%
    ),
    linear-gradient(
      180deg,
      rgb(224 246 250) 0%,
      var(--color-bg) 58%,
      var(--color-bg) 100%
    ) !important;
}
</style>

<style scoped>
.cover-slide {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 7% 9%;
}

.cover-content {
  text-align: center;
  width: min(76ch, 100%);
  transform: translateX(-0.6%);
}

.cover-title {
  margin-bottom: 0;
  font-size: clamp(1.4rem, 2.7vw, 2rem) !important;
  font-weight: 800;
  line-height: 1.16;
  letter-spacing: -0.02em;
  text-wrap: balance;
}

.cover-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.6;
}

.cover-compact .cover-title {
  font-size: clamp(1.2rem, 2.4vw, 1.72rem) !important;
}

.cover-meta {
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-text-muted);
}

.cover-social {
  position: absolute;
  right: 2rem;
  bottom: 1.75rem;
}
</style>
