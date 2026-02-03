<script setup lang="ts">

import NavigationLink from '../ui/navigation-link'
import { useLogoElementContent } from '@lightspeed/crane'
import { Content } from '../../type.ts'
import { computed } from 'vue'

const logoContent = useLogoElementContent<Content>()

const isLogoText = computed(()=> logoContent.type === 'TEXT')
</script>

<template>
	<NavigationLink
		v-if="isLogoText"
		:text="logoContent.text || ''"
		:url="'/'"
		:uppercase="true" />
	<NavigationLink
		v-else
		style="display: flex"
		text=""
		:url="'/'" >
		<img
			class="logo-section-image__content"
			:src="logoContent.image.lowResolutionDesktopImage"
			alt="Logo Image"
		>
	</NavigationLink>
</template>

<style scoped>
.logo-section-image__content {
  max-height: 35px;
  object-fit: contain;
}
</style>
