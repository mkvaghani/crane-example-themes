<template>
	<Teleport to="body">
		<div v-if="isOpen">
			<div class="find-store-submenu-overlay" @click="$emit('close')" />
			<div
				class="find-store-submenu-overlay__content"
				:style="{ top: findStoreSubmenuTopOffset }"
				@mouseleave="onMouseLeave">
				<Locations />
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import type { OverlayProps, CloseEmits } from '../../types'
import { useEscapeKey, useHeaderDesign, useSubmenuPosition, useHeaderViewport } from '../../composables'
import Locations from './Locations.vue'

const props = defineProps<OverlayProps>()
const emit = defineEmits<CloseEmits>()

// SSR-safe viewport detection
const { isDesktop } = useHeaderViewport()

const onMouseLeave = () => {
	if (isDesktop.value) {
		emit('close')
	}
}

const { headerBackgroundColor } = useHeaderDesign()

// Calculate submenu position dynamically - position below the top row
const { submenuTopOffset: findStoreSubmenuTopOffset } = useSubmenuPosition(() => props.isOpen, '.header-top-row')

// Handle Escape key to close submenu
useEscapeKey(
	() => emit('close'),
	() => props.isOpen,
)
</script>

<style scoped lang="scss">
@use '../../constants' as c;

.find-store-submenu-overlay {
  position: fixed;
  inset: 0;
  background-color: transparent;
}

.find-store-submenu-overlay__content {
  position: fixed;
  left: 0;
  right: 0;
  background-color: v-bind(headerBackgroundColor);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  z-index: c.$Z_INDEX_CATALOG_CONTENT;
  max-height: 80vh;
  overflow-y: auto;
}
</style>
