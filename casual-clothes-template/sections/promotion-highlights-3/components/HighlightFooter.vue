<template>
	<footer class="promotion-highlights-3__footer">
		<Button
			v-if="ctaButton?.hasTitle && ctaButtonDesign?.visible"
			:content="ctaButton"
			:design="ctaButtonDesign"
			show-arrow
			class="promotion-highlights-3__cta-button"
		/>
	</footer>
</template>

<script setup lang="ts">
import Button from '../../../shared/components/Button.vue'
import { useButtonElementContent, useButtonElementDesign } from '@lightspeed/crane'
import type { Content, Design } from '../type.ts'

const ctaButton = useButtonElementContent<Content>('cta_button')
const ctaButtonDesign = useButtonElementDesign<Design>('cta_button')
</script>

<style scoped lang="scss">
.promotion-highlights-3 {
  &__footer {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }

  &__cta-button {
    display: flex;
    width: 100%;
  }
}

@media (min-width: 768px) {
  .promotion-highlights-3__cta-button {
    display: inline-flex;
    width: auto;
  }
}
</style>
