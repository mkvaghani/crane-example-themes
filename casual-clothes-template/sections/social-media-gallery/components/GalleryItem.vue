<template>
	<article v-if="imageUrl" class="gallery-item">
		<div class="gallery-item__image">
			<img :src="imageUrl" :alt="altText">
			<div class="gallery-item__overlay" />
		</div>
		<p class="gallery-item__username" :style="usernameStyle">{{ username }}</p>
	</article>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

defineProps<{
	imageUrl: string
	username: string
	altText: string
	usernameStyle?: CSSProperties
}>()
</script>

<style scoped lang="scss">
.gallery-item {
  flex: 0 0 216px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  scroll-snap-align: center;

  &__image {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
    pointer-events: none;
  }

  &__username {
    color: #000;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: -0.08px;
  }

  @media (min-width: 768px) {
    flex: 0 0 340px;
    gap: 16px;
    scroll-snap-align: start;
  }
}
</style>
