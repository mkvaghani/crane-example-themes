<template>
	<div>
		<p
			v-show="title?.hasContent"
			class="head-text"
			:style="titleStyle"
			v-text="title?.value"
		></p>
		<p
			v-show="description && description?.hasContent"
			class="description-text"
			:style="descriptionStyle"
			v-text="description?.value"
		></p>
	</div>
	<div class="gap-down"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createTextStyle } from '../utils'

interface ContentItem {
  hasContent: boolean
  value: string | undefined
}

const props = defineProps<{
  title: ContentItem
  description: ContentItem | null
  titleDesign?: TextDesignData
  descriptionDesign?: TextDesignData
}>()

const titleStyle = computed(() => createTextStyle(props.titleDesign, { defaultSize: 32 }))
const descriptionStyle = computed(() => createTextStyle(props.descriptionDesign, { defaultSize: 16 }))
</script>

<style lang="scss" scoped>
.gap-down{
  margin-bottom: 32px;
}

.head-text{
  line-height: 150%;
  letter-spacing: -0.16px;
  margin: 0;
}

.description-text {
  margin-top: 24px;
  line-height: 150%;
  letter-spacing: -0.08px;
  white-space: pre-line
}

@media (max-width: 768px) {
  .head-text{
    letter-spacing: -0.12px;
  }
}
</style>
