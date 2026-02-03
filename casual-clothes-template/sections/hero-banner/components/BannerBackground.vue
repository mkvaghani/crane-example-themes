<template>
	<div class="banner-background">
		<img
			v-if="hasValidBackgroundImage"
			:src="backgroundImage.highResolutionDesktopImage"
			alt=""
			class="banner-background__image" />
		<div v-show="overlayBackgroundDesign.enabled" class="banner-background__overlay" :style="overlayStyle"></div>
	</div>
</template>

<script setup lang="ts">
import { useImageElementContent, useToggleElementDesign } from '@lightspeed/crane'
import { Content, Design } from '../type.ts'
import { hasValidImageContent } from '../../../shared/utils'
import { computed, CSSProperties } from 'vue'

const backgroundImage = useImageElementContent<Content>('background_image')

const hasValidBackgroundImage = computed(() => hasValidImageContent(backgroundImage))
const overlayBackgroundDesign = useToggleElementDesign<Design>('overlay_background') as ToggleDesignData

const overlayStyle: CSSProperties = {
	background: `
      linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 40%,
        rgba(0, 0, 0, 0.25) 60%,
        rgba(0, 0, 0, 0.45) 100%
      );
		`,
}
</script>

<style scoped lang="scss">
.banner-background {
  position: absolute;
  inset: 0;
  pointer-events: none;

  &__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;

    @media (min-width: 768px) {
      object-position: right center;
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
  }
}
</style>
