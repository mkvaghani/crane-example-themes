<template>
	<div>
		<MobileHeaderTop
			:is-menu-open="isMobileSiteMenuOpen"
			@toggle-menu="toggleMobileSiteMenu"
		/>

		<MobileHeaderActions />

		<MobileHeaderDivider v-if="hasTopActions" />

		<MobileHeaderBottom
			v-if="hasBottomContent"
			@toggle-catalog="toggleCatalogOverlay"
		/>

		<MobileSiteMenu
			:is-open="isMobileSiteMenuOpen"
			@close="closeMobileSiteMenu"
			@open-find-store="handleOpenFindStore"
			@open-customer-care="handleOpenCustomerCare"
		/>

		<MobileCatalogOverlay
			v-if="categoriesShow.enabled"
			:is-open="isMobileCatalogOverlayOpen"
			@close="closeCatalogOverlay"
			@open-catalog="handleOpenCatalogSubmenu"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import MobileHeaderTop from './MobileHeaderTop.vue'
import MobileHeaderActions from './MobileHeaderActions.vue'
import MobileHeaderDivider from './MobileHeaderDivider.vue'
import MobileHeaderBottom from './MobileHeaderBottom.vue'
import MobileSiteMenu from './MobileSiteMenu.vue'
import MobileCatalogOverlay from './MobileCatalogOverlay.vue'
import type { Category } from '../../types'
import type { OpenCatalogEmits } from '../../types'
import { useHeaderToggles } from '../../composables'

const emit = defineEmits<OpenCatalogEmits & {
	(e: 'open-find-store'): void
	(e: 'open-customer-care'): void
}>()

const isMobileSiteMenuOpen = ref(false)
const isMobileCatalogOverlayOpen = ref(false)

const { accountShow, wishlistShow, cartShow, searchShow, categoriesShow } = useHeaderToggles()

const hasTopActions = computed(() => {
	return accountShow.enabled || wishlistShow.enabled || cartShow.enabled
})

const hasBottomContent = computed(() => {
	return searchShow.enabled || categoriesShow.enabled
})

const toggleMobileSiteMenu = () => {
	isMobileSiteMenuOpen.value = !isMobileSiteMenuOpen.value
}

const closeMobileSiteMenu = () => {
	isMobileSiteMenuOpen.value = false
}

const toggleCatalogOverlay = () => {
	isMobileCatalogOverlayOpen.value = !isMobileCatalogOverlayOpen.value
}

const closeCatalogOverlay = () => {
	isMobileCatalogOverlayOpen.value = false
}

const handleOpenCatalogSubmenu = (category: Category) => {
	// Don't close the catalog overlay - keep it in the background
	// Emit event to parent (CustomHeader) to open the submenu
	emit('open-catalog', category)
}

const handleOpenFindStore = () => {
	// Don't close the mobile site menu - keep it in the background
	// Emit event to parent (CustomHeader) to open the find store overlay
	emit('open-find-store')
}

const handleOpenCustomerCare = () => {
	// Don't close the mobile site menu - keep it in the background
	// Emit event to parent (CustomHeader) to open the customer care overlay
	emit('open-customer-care')
}

// Expose methods to close overlays (called from CustomHeader)
defineExpose({
	closeMobileCatalogOverlay: closeCatalogOverlay,
	closeMobileSiteMenu: closeMobileSiteMenu,
})

</script>
