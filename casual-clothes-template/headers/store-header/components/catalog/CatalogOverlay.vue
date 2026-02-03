<template>
	<div>
		<CatalogSubmenu
			v-if="isOpen && !isMobile"
			:is-open="isOpen"
			:category="category"
			@close="$emit('close')"
		/>

		<MobileCatalogSubmenu
			v-if="isMobile && isOpen"
			:is-open="isOpen"
			:category="category"
			@close="$emit('close')"
			@close-all="$emit('close-all')"
		/>
	</div>
</template>

<script setup lang="ts">
import CatalogSubmenu from './CatalogSubmenu.vue'
import MobileCatalogSubmenu from '../mobile/MobileCatalogSubmenu.vue'
import type { CatalogOverlayProps, CascadeCloseEmits } from '../../types/common'
import { useHeaderViewport, useEscapeKey } from '../../composables'

const props = defineProps<CatalogOverlayProps>()
const emit = defineEmits<CascadeCloseEmits>()

const { isMobile } = useHeaderViewport()

// Handle Escape key to close overlay
useEscapeKey(
	() => emit('close'),
	() => props.isOpen,
)
</script>
