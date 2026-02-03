<template>
	<div class="key-info-bar" :style="contentStyle">
		{{ message }}
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
	useInputboxElementContent,
	useTextElementDesign,
	useBackgroundElementDesign,
} from '@lightspeed/crane'
import { Content, Design } from '../../type.ts'
import { createTextStyle } from '../../../../shared/utils'
import { getBackgroundValue } from '../../../../shared/composables'

const messageContent = useInputboxElementContent<Content>('KeyInfoBarContent')
const messageDesign = useTextElementDesign<Design>('KeyInfoBarText') as TextDesignData
const backgroundDesign = useBackgroundElementDesign<Design>('KeyInfoBarBackground') as BackgroundDesignData

const message = computed(() => {
	return messageContent.value
})

const contentStyle = computed(() => {
	const textStyle = createTextStyle(messageDesign)

	// Handle global.fontFamily.body special case
	if (messageDesign?.font === 'global.fontFamily.body') {
		textStyle.fontFamily = 'system-ui, -apple-system, sans-serif'
	}

	return {
		...textStyle,
		background: getBackgroundValue(backgroundDesign),
		textAlign: 'center' as const,
	}
})
</script>

<style scoped lang="scss">
@use '../../constants' as c;

.key-info-bar {
  display: flex;
  padding: 8px 32px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  gap: 9px;
  width: 100%;
  line-height: 150%;
  font-feature-settings: 'liga' off, 'clig' off;
  text-align: center; /* Center-align text content */
}

@media (max-width: c.$MOBILE_MAX_WIDTH) {
  .key-info-bar {
    padding: 8px;
  }
}
</style>
