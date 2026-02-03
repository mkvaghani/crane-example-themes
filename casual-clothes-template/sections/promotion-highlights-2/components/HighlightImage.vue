<template>
	<div class="highlight-image">
		<div class="highlight-image__container">
			<img
				v-if="hasValidProductImage"
				:src="productImage.highResolutionDesktopImage"
				:alt="imageAlt"
				class="highlight-image__image"
			/>
		</div>
		<div
			v-if="overlayHeadline?.value"
			class="highlight-image__overlay-text"
			:style="overlayHeadlineStyle"
		>
			{{ overlayHeadline?.value }}
		</div>
	</div>
</template>

<script setup lang="ts">

import { computed } from 'vue'
import { hasValidImageContent, getColorHex } from '../../../shared/utils'
import { useImageElementContent, useTextareaElementContent, useTextElementDesign } from '@lightspeed/crane'
import type { Content, Design } from '../type.ts'

const productImage = useImageElementContent<Content>('product_image')
const overlayHeadline = useTextareaElementContent<Content>('overlay_headline')

const overlayHeadlineDesign = useTextElementDesign<Design>('overlay_headline') as TextDesignData

const hasValidProductImage = computed(() => hasValidImageContent(productImage))

const imageAlt = computed(() => overlayHeadline?.value || 'Promotional product image')

const overlayHeadlineStyle = computed(() => {
	if (!overlayHeadlineDesign.visible) return { display: 'none' }

	return {
		fontFamily: overlayHeadlineDesign.font || 'Inter',
		color: getColorHex(overlayHeadlineDesign.color) || '#FFFFFF',
		fontWeight: overlayHeadlineDesign.bold ? 'bold' : 'normal',
		fontStyle: overlayHeadlineDesign.italic ? 'italic' : 'normal',
		'--desktop-font-size': `${overlayHeadlineDesign?.size || 128}px`,
	}
})
</script>

<style scoped lang="scss">
.highlight-image {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 32px;

  &__container {
    position: relative;
    width: 150px;
    height: 150px;
    flex-shrink: 0;
    margin-bottom: -32px;
    z-index: 1;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__overlay-text {
    font-size: 48px;
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.24px;
    text-align: center;
    color: #ffffff;
    pointer-events: none;
    mix-blend-mode: exclusion;
    white-space: pre-line;
    max-width: 304px;
    margin-bottom: -32px;
    z-index: 2;
    position: relative;
  }
}

@media (min-width: 768px) {
  .highlight-image {
    padding-bottom: 0;

    &__container {
      width: 700px;
      height: 700px;
      margin-bottom: 0;
    }

    &__overlay-text {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      font-size: var(--desktop-font-size, 128px); /* Use design settings or default to 128px */
      letter-spacing: -0.64px;
      padding: 32px;
      max-width: none;
      margin-bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
