<template>
	<div>
		<FindStoreSubmenu
			v-if="isOpen && !isMobile"
			:is-open="isOpen"
			@close="$emit('close')"
		/>

		<MobileFindStoreSubmenu
			v-if="isMobile && isOpen"
			:is-open="isOpen"
			@close="$emit('close')"
			@close-all="$emit('close-all')"
		/>
	</div>
</template>

<script setup lang="ts">
import FindStoreSubmenu from './FindStoreSubmenu.vue'
import MobileFindStoreSubmenu from '../mobile/MobileFindStoreSubmenu.vue'
import type { OverlayProps, CascadeCloseEmits } from '../../types/common'
import { useHeaderViewport, useEscapeKey } from '../../composables'

const props = defineProps<OverlayProps>()
const emit = defineEmits<CascadeCloseEmits>()

const { isMobile } = useHeaderViewport()

// Handle Escape key to close overlay
useEscapeKey(
	() => emit('close'),
	() => props.isOpen,
)
</script>
