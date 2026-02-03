<template>
	<div class="banner-content">
		<div class="banner-content__text">
			<p v-if="eyebrowText?.value" class="banner-content__eyebrow" :style="eyebrowTextStyle">
				{{ eyebrowText.value }}
			</p>
			<p v-if="heroTitle?.value" class="banner-content__title" :style="heroTitleStyle">
				{{ heroTitle.value }}
			</p>
		</div>

		<div v-if="ctaButton?.hasTitle && ctaButtonDesign?.visible" class="banner-content__cta">
			<Button
				:content="ctaButton"
				:design="ctaButtonDesign"
				show-arrow
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createTextStyle } from '../../../shared/utils'
import Button from '../../../shared/components/Button.vue'
import {
	useButtonElementContent, useButtonElementDesign,
	useInputboxElementContent,
	useTextareaElementContent, useTextElementDesign,
} from '@lightspeed/crane'
import type { Content, Design } from '../type.ts'

const eyebrowText = useInputboxElementContent<Content>('eyebrow_text')
const heroTitle = useTextareaElementContent<Content>('hero_title')
const ctaButton = useButtonElementContent<Content>('cta_button')

const eyebrowTextDesign = useTextElementDesign<Design>('eyebrow_text') as TextDesignData
const heroTitleDesign = useTextElementDesign<Design>('hero_title') as TextDesignData
const ctaButtonDesign = useButtonElementDesign<Design>('cta_button')

const eyebrowTextStyle = computed(() => createTextStyle(eyebrowTextDesign, { defaultSize: 16, defaultColor: '#FFFFFF' }))
const heroTitleStyle = computed(() => createTextStyle(heroTitleDesign, { defaultSize: 36, defaultColor: '#FFFFFF' }))
</script>

<style scoped lang="scss">

.banner-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 32px;
  min-height: 468px;

  @media (min-width: 768px) {
    max-width: 600px;
  }

  &__text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    text-align: center;
  }

  &__eyebrow {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: -0.08px;
    margin: 0;
  }

  &__title {
    font-size: 32px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: -0.16px;
    margin: 0;
    white-space: pre-wrap;
  }

  &__cta {
    display: flex;
    justify-content: center;
  }
}
</style>
