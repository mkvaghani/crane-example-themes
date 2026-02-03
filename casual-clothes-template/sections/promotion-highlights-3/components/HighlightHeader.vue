<template>
	<header class="promotion-highlights-3__header">
		<h2 class="promotion-highlights-3__title" :style="titleStyle">{{ sectionTitle?.value }}</h2>
	</header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createTextStyle } from '../../../shared/utils'
import { useInputboxElementContent, useTextElementDesign } from '@lightspeed/crane'
import type { Content, Design } from '../type.ts'

const sectionTitle = useInputboxElementContent<Content>('section_title')

const sectionTitleDesign = useTextElementDesign<Design>('section_title') as TextDesignData

const titleStyle = computed(() => createTextStyle(sectionTitleDesign, { defaultSize: 32 }))
</script>

<style scoped lang="scss">
.promotion-highlights-3 {
  &__header {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 24px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: -0.12px;
  }
}

@media (min-width: 768px) {
  .promotion-highlights-3__title {
    font-size: 32px;
    letter-spacing: -0.16px;
  }
}
</style>
