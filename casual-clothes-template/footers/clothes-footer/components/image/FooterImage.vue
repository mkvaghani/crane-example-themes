<template>
	<div class="image-container" v-if="shouldShowSection">
		<img v-if="hasImage" :src="footerData?.footerImage?.highResolutionDesktopImage" alt="footer image">
		<div :style="linkStyle" class="footer-text">{{ footerData?.footerText?.value }}</div>
	</div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { footerDesignKey, footerImageKey } from '../../types/type.ts'
import { createTextStyle } from '../../../../shared/utils'

const footerData = inject(footerImageKey)

const siteDesign = inject(footerDesignKey)

const hasImage = computed(() => {
	const imageUrl = footerData?.footerImage?.highResolutionDesktopImage
	return imageUrl && imageUrl !== 'undefined' && imageUrl !== '/undefined' && !imageUrl.includes('undefined')
})

const hasText = computed(() => {
	return footerData?.footerText?.value && siteDesign?.footerTextDesign?.visible
})

const shouldShowSection = computed(() => hasImage.value || hasText.value)

// Use createTextStyle but override fontSize since it uses vw units via v-bind
const linkStyle = computed(() => {
	const baseStyle = createTextStyle(siteDesign?.footerTextDesign)
	// Remove fontSize as it's handled separately via v-bind(footerTextSize)
	const { fontSize: _fontSize, ...styleWithoutFontSize } = baseStyle
	return styleWithoutFontSize
})

const footerTextSize = computed(() => siteDesign?.footerTextDesign.size
	? `${siteDesign?.footerTextDesign.size}vw` : '10vw')
</script>

<style scoped>
.image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 4;
  max-height: 228px;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.footer-text {
  position: absolute;
  bottom: 2px;
  left: 0;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  box-sizing: border-box;

  font-size: v-bind(footerTextSize);

  font-style: normal;
  font-weight: 400;
  line-height: 56%;
  letter-spacing: -0.8px;
  text-transform: uppercase;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
