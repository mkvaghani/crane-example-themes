<template>
	<header class="social-media-gallery__header">
		<h2 class="social-media-gallery__title" :style="titleStyle">
			{{ sectionTitle?.value }}
		</h2>
		<p
			class="social-media-gallery__subtitle"
			:style="subtitleStyle"
		>
			<template v-for="(segment, index) in subtitleSegments" :key="index">
				<strong v-if="segment.isHashtag">
					{{ segment.text }}
				</strong>
				<template v-else>
					{{ segment.text }}
				</template>
			</template>
		</p>
	</header>
</template>

<script setup lang="ts">

import { computed } from 'vue'
import { createTextStyle } from '../../../shared/utils'
import { useInputboxElementContent, useTextareaElementContent, useTextElementDesign } from '@lightspeed/crane'
import type { Content, Design } from '../type.ts'
import { TextSegment } from '../types'
import { parseSubtitleSegments } from '../utils/utils.ts'

const sectionTitle = useInputboxElementContent<Content>('section_title')
const sectionSubtitle = useTextareaElementContent<Content>('section_subtitle')

const sectionTitleDesign = useTextElementDesign<Design>('section_title') as TextDesignData
const sectionSubtitleDesign = useTextElementDesign<Design>('section_subtitle') as TextDesignData

const titleStyle = computed(() => createTextStyle(sectionTitleDesign, { defaultSize: 32 }))
const subtitleStyle = computed(() => createTextStyle(sectionSubtitleDesign, { defaultSize: 16 }))

const subtitleSegments = computed<TextSegment[]>(() => parseSubtitleSegments(sectionSubtitle.value))
</script>

<style scoped lang="scss">
.social-media-gallery {
  &__header {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__title {
    color: #000;
    font-size: 24px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: -0.12px;
  }

  &__subtitle {
    color: #000;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: -0.08px;
    white-space: pre-line;

    & strong {
      font-weight: 700;
    }
  }
}

@media (min-width: 768px) {
  .social-media-gallery {
    &__header {
      gap: 24px;
    }

    &__title {
      font-size: 32px;
      letter-spacing: -0.16px;
    }
  }
}
</style>
