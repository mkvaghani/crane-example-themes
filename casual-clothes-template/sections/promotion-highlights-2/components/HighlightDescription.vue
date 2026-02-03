<template>
	<p
		v-if="description?.value"
		class="highlight-description"
		:style="descriptionStyle"
	>
		{{ description?.value }}
	</p>
</template>

<script setup lang="ts">
import { useTextareaElementContent, useTextElementDesign } from '@lightspeed/crane'
import type { Content, Design } from '../type.ts'
import { computed } from 'vue'
import { createTextStyle } from '../../../shared/utils'

const description = useTextareaElementContent<Content>('description')
const descriptionDesign = useTextElementDesign<Design>('description') as TextDesignData
const descriptionStyle = computed(() => createTextStyle(descriptionDesign, { defaultSize: 16 }))
</script>

<style scoped lang="scss">
.highlight-description {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.08px;
  text-align: center;
  color: #000000;
  width: 100%;
  white-space: pre-line
}

@media (min-width: 768px) {
  .highlight-description {
    width: auto;
  }
}
</style>
