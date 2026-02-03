<template>
	<div class="brand-story__content">
		<div class="brand-story__content-wrapper">
			<div class="brand-story__title" :style="titleStyle">
				{{ sectionTitle.value }}
			</div>
			<div class="brand-story__text-content">
				<div class="brand-story__description" :style="descriptionStyle">
					{{ sectionDescription.value }}
				</div>
				<Button
					:content="ctaButtonContent"
					:design="ctaButtonDesign"
					show-arrow
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from '../../../shared/components/Button.vue'
import { createTextStyle } from '../../../shared/utils'
import {
	useButtonElementContent,
	useButtonElementDesign,
	useInputboxElementContent,
	useTextareaElementContent,
	useTextElementDesign,
} from '@lightspeed/crane'
import { Content, Design } from '../type.ts'

const sectionTitle = useInputboxElementContent<Content>('section_title')
const sectionDescription = useTextareaElementContent<Content>('section_description')
const ctaButtonContent = useButtonElementContent<Content>('cta_button')

const sectionTitleDesign = useTextElementDesign<Design>('section_title') as TextDesignData
const sectionDescriptionDesign = useTextElementDesign<Design>('section_description') as TextDesignData
const ctaButtonDesign = useButtonElementDesign<Design>('cta_button')

// Text styles using shared utility
const titleStyle = computed(() => createTextStyle(sectionTitleDesign, { defaultSize: 32 }))
const descriptionStyle = computed(() => createTextStyle(sectionDescriptionDesign, { defaultSize: 16 }))
</script>

<style scoped lang="scss">
.brand-story {
  &__content {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 8px;

    @media (min-width: 768px) {
      gap: 24px;
    }
  }

  &__content-wrapper {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 24px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: flex-start;
    }
  }

  &__title {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
    word-wrap: break-word;

    @media (min-width: 768px) {
      flex: 1 1 0;
    }
  }

  &__text-content {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 16px;

    @media (min-width: 768px) {
      flex: 1 1 0;
    }
  }

  &__description {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
    word-wrap: break-word;
    white-space: pre-line;
  }
}
</style>
