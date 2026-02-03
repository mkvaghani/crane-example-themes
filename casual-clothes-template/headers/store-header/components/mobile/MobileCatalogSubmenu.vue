<template>
	<FullScreenOverlay
		:is-open="isOpen"
		:background-color="headerBackgroundColor"
		:text-color="headerTextColor"
		@close="$emit('close')"
	>
		<div class="mobile-catalog-submenu">
			<MobileCatalogSubmenuHeader
				@back="$emit('close')"
				@close-all="$emit('close-all')"
			/>
			<MobileCatalogSubmenuGrid
				:category="category"
				@close-all="$emit('close-all')"
			/>
		</div>
	</FullScreenOverlay>
</template>

<script setup lang="ts">
import type { CatalogOverlayProps, CascadeCloseEmits } from '../../types/common'
import { FullScreenOverlay } from '../ui/overlay'
import MobileCatalogSubmenuHeader from './MobileCatalogSubmenuHeader.vue'
import MobileCatalogSubmenuGrid from './MobileCatalogSubmenuGrid.vue'
import { useHeaderDesign } from '../../composables'

defineProps<CatalogOverlayProps>()
defineEmits<CascadeCloseEmits>()

const { headerBackgroundColor, headerTextColor } = useHeaderDesign()
</script>

<style scoped lang="scss">
.mobile-catalog-submenu {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>
