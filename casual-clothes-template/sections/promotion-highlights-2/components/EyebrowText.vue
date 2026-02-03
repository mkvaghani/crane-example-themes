<template>
	<p
		v-if="eyebrowText?.value"
		class="promotion-highlights-eyebrow"
		:style="eyebrowTextStyle"
	>
		{{ eyebrowText?.value }}
	</p>
</template>

<script setup lang="ts">
import { useInputboxElementContent, useTextElementDesign } from '@lightspeed/crane'
import type { Content, Design } from '../type.ts'
import { computed } from 'vue'
import { createTextStyle } from '../../../shared/utils'

const eyebrowText = useInputboxElementContent<Content>('eyebrow_text')

const eyebrowTextDesign = useTextElementDesign<Design>('eyebrow_text') as TextDesignData

const eyebrowTextStyle = computed(() => createTextStyle(eyebrowTextDesign, { defaultSize: 16 }))
</script>

<style scoped lang="scss">
.promotion-highlights-eyebrow {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.08px;
  text-align: center;
  color: #000000;
  width: 100%;
}
</style>
