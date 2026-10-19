<script setup lang="ts">
import { computed } from 'vue'

interface ProfileItem {
  icon?: 'calendar' | 'building' | 'x' | 'github' | 'website' | 'link'
  label: string
  href?: string
}

interface Props {
  name: string
  affiliation?: string
  x?: string
  github?: string
  website?: string
  avatar?: string
  avatarAlt?: string
  secondaryImage?: string
  secondaryImageAlt?: string
  nameColor?: string
  leftOffset?: string
  avatarWidth?: string
  secondaryImageWidth?: string
  items?: ProfileItem[]
}

const props = withDefaults(defineProps<Props>(), {
  avatarAlt: 'プロフィール画像',
  secondaryImageAlt: '',
  nameColor: 'var(--color-accent)',
  leftOffset: '5.5rem',
  avatarWidth: '280px',
  secondaryImageWidth: '180px',
  items: () => [],
})

const generatedItems = computed<ProfileItem[]>(() => {
  const items: ProfileItem[] = []

  if (props.affiliation)
    items.push({ icon: 'building', label: props.affiliation })
  if (props.x)
    items.push({ icon: 'x', label: `x.com/${props.x}`, href: `https://x.com/${props.x}` })
  if (props.github)
    items.push({ icon: 'github', label: `github.com/${props.github}`, href: `https://github.com/${props.github}` })
  if (props.website)
    items.push({
      icon: 'website',
      label: props.website.replace(/^https?:\/\//, '').replace(/\/$/, ''),
      href: props.website,
    })

  return items
})

const profileItems = computed(() => [
  ...props.items,
  ...generatedItems.value,
])
</script>

<template>
  <div class="profile-slide">
    <section class="profile-left" :style="{ paddingTop: leftOffset }">
      <h1 class="profile-name" :style="{ color: nameColor }">
        {{ name }}
      </h1>

      <div class="profile-items">
        <a
          v-for="(item, index) in profileItems"
          :key="`${item.label}-${index}`"
          class="profile-item"
          :href="item.href"
          :target="item.href ? '_blank' : undefined"
        >
          <span class="profile-icon" aria-hidden="true">
            <carbon-calendar v-if="item.icon === 'calendar'" />
            <carbon-building v-else-if="item.icon === 'building'" />
            <carbon-logo-x v-else-if="item.icon === 'x'" />
            <carbon-logo-github v-else-if="item.icon === 'github'" />
            <carbon-globe v-else-if="item.icon === 'website'" />
            <carbon-link v-else />
          </span>
          <span>{{ item.label }}</span>
        </a>
      </div>
    </section>

    <section v-if="avatar || secondaryImage" class="profile-images">
      <img
        v-if="avatar"
        class="profile-avatar"
        :src="avatar"
        :alt="avatarAlt"
        :style="{ width: avatarWidth }"
      >
      <img
        v-if="secondaryImage"
        class="profile-secondary-image"
        :src="secondaryImage"
        :alt="secondaryImageAlt"
        :style="{ width: secondaryImageWidth }"
      >
    </section>
  </div>
</template>

<style scoped>
.profile-slide {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 3rem;
  width: 100%;
  min-height: 100%;
}

.profile-left {
  min-width: 0;
}

.profile-name {
  margin: 0 0 1.6rem;
  font-size: clamp(1.65rem, 3vw, 2.35rem);
  line-height: 1.12;
  letter-spacing: 0;
}

.profile-items {
  display: flex;
  flex-direction: column;
  gap: 0.72rem;
}

.profile-item {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  width: fit-content;
  color: var(--color-text);
  border-bottom: 0 !important;
  font-size: clamp(0.98rem, 1.6vw, 1.16rem);
  font-weight: 650;
  line-height: 1.35;
  text-decoration: none;
}

.profile-item[href]:hover {
  opacity: 0.72;
}

.profile-icon {
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  color: var(--color-accent);
  font-size: 1.05em;
}

.profile-images {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  min-width: 0;
}

.profile-avatar,
.profile-secondary-image {
  display: block;
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

.profile-avatar {
  border-radius: 14px;
}

.profile-secondary-image {
  border-radius: 10px;
}
</style>
