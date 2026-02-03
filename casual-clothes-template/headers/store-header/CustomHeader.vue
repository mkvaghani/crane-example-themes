<template>
	<header class="custom-header" role="banner">
		<KeyInfoBar v-if="keyInfoBarShow.enabled" />
		<MobileHeader
			ref="mobileHeaderRef"
			class="mobile-header"
			@open-catalog="openCatalogOverlay"
			@open-find-store="openFindStoreOverlay"
			@open-customer-care="openCustomerCareOverlay"
		/>

		<div class="desktop-header">
			<nav class="header-navigation" role="navigation">
				<div class="header-container">
					<HeaderTopRow
						@open-find-store="openFindStoreOverlay"
						@open-customer-care="openCustomerCareOverlay"
					/>
				</div>
				<div v-if="hasBottomRowContent" class="navigation-menu-spacer"></div>
				<div v-if="hasBottomRowContent" class="header-container">
					<HeaderBottomRow
						:active-category="selectedCategory"
						@open-catalog="openCatalogOverlay"
						@close-catalog="closeCatalogOverlay"
					/>
				</div>
			</nav>
		</div>

		<CatalogOverlay
			:is-open="isCatalogOverlayOpen"
			:category="selectedCategory"
			@close="closeCatalogOverlay"
			@close-all="closeAllCatalogOverlays"
		/>

		<FindStoreOverlay
			:is-open="isFindStoreOpen"
			@close="closeFindStoreOverlay"
			@close-all="closeAllFindStoreOverlays"
		/>

		<CustomerCareOverlay
			:is-open="isCustomerCareOpen"
			@close="closeCustomerCareOverlay"
			@close-all="closeAllCustomerCareOverlays"
		/>

		<div id="portal-target"></div>
	</header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import KeyInfoBar from './components/layout/KeyInfoBar.vue'
import HeaderTopRow from './components/layout/HeaderTopRow.vue'
import HeaderBottomRow from './components/layout/HeaderBottomRow.vue'
import MobileHeader from './components/mobile/MobileHeader.vue'
import CatalogOverlay from './components/catalog/CatalogOverlay.vue'
import FindStoreOverlay from './components/locations/FindStoreOverlay.vue'
import CustomerCareOverlay from './components/customer-care/CustomerCareOverlay.vue'
import type { Category } from './types'
import { useHeaderToggles, useHeaderDesign, useHeaderViewport, useBodyScrollLock } from './composables'

// Catalog overlay state management
const isCatalogOverlayOpen = ref(false)
const selectedCategory = ref<Category | null>(null)
const mobileHeaderRef = ref<InstanceType<typeof MobileHeader> | null>(null)

// Find Store overlay state management
const isFindStoreOpen = ref(false)

// Customer Care overlay state management
const isCustomerCareOpen = ref(false)

// SSR-safe viewport detection
const { isDesktop } = useHeaderViewport()

// Prevent body scroll when desktop overlays are open
useBodyScrollLock([isCatalogOverlayOpen, isFindStoreOpen, isCustomerCareOpen], isDesktop)

const { keyInfoBarShow, searchShow, categoriesShow } = useHeaderToggles()
const { headerBackgroundColor, headerTextColor, headerFontFamily, headerFontSize, headerFontWeight, headerFontStyle } = useHeaderDesign()

const hasBottomRowContent = computed(() => {
	return searchShow.enabled || categoriesShow.enabled
})

const openCatalogOverlay = (category: Category) => {
	// Toggle: if opening the same category, close it; otherwise open the new one
	if (isCatalogOverlayOpen.value && selectedCategory.value?.id === category.id) {
		closeCatalogOverlay()
	} else {
		// Close other overlays first (only one overlay open at a time)
		closeFindStoreOverlay()
		closeCustomerCareOverlay()
		// Open catalog
		selectedCategory.value = category
		isCatalogOverlayOpen.value = true
	}
}

const closeCatalogOverlay = () => {
	isCatalogOverlayOpen.value = false
	selectedCategory.value = null
}

const closeAllCatalogOverlays = () => {
	// Close the main catalog overlay
	closeCatalogOverlay()
	// Also close the mobile catalog overlay
	mobileHeaderRef.value?.closeMobileCatalogOverlay()
}

const openFindStoreOverlay = () => {
	// Toggle: if already open, close it; otherwise open it
	if (isFindStoreOpen.value) {
		closeFindStoreOverlay()
	} else {
		// Close other overlays first (only one overlay open at a time)
		closeCatalogOverlay()
		closeCustomerCareOverlay()
		// Open Find Store
		isFindStoreOpen.value = true
	}
}

const closeFindStoreOverlay = () => {
	isFindStoreOpen.value = false
}

const closeAllFindStoreOverlays = () => {
	closeFindStoreOverlay()
	mobileHeaderRef.value?.closeMobileSiteMenu()
}

const openCustomerCareOverlay = () => {
	// Toggle: if already open, close it; otherwise open it
	if (isCustomerCareOpen.value) {
		closeCustomerCareOverlay()
	} else {
		// Close other overlays first (only one overlay open at a time)
		closeCatalogOverlay()
		closeFindStoreOverlay()
		// Open Customer Care
		isCustomerCareOpen.value = true
	}
}

const closeCustomerCareOverlay = () => {
	isCustomerCareOpen.value = false
}

const closeAllCustomerCareOverlays = () => {
	closeCustomerCareOverlay()
	mobileHeaderRef.value?.closeMobileSiteMenu()
}
</script>

<style scoped lang="scss">
@use './constants' as c;

// Global focus-visible styles for keyboard navigation accessibility
// Uses :deep() to apply to all child components
:deep(*:focus-visible) {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.custom-header {
  display: flex;
  flex-direction: column;
  background-color: v-bind(headerBackgroundColor);
  color: v-bind(headerTextColor);
  font-family: v-bind(headerFontFamily);
  font-size: v-bind(headerFontSize);
  font-weight: v-bind(headerFontWeight);
  font-style: v-bind(headerFontStyle);
}

.header-navigation {
  display: flex;
  flex-direction: column;
}

.header-container {
  --container-padding: 20px;

  margin: 0 auto;
  padding: 0 var(--container-padding);
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;

  @media (max-width: c.$MOBILE_MAX_WIDTH) {
    --container-padding: 16px;
  }
}

.navigation-menu-spacer {
  height: 1px;
  background-color: #DBDBDB;
}

.mobile-header {
  display: none;
  flex-direction: column;
  /* Inherit background, color, and font from parent .custom-header */
  line-height: 150%;
  letter-spacing: -0.08px;

  @media (max-width: c.$MOBILE_STORE_HEADER_BREAKPOINT) {
    display: flex;
  }
}

.desktop-header {
  display: block;

  @media (max-width: c.$MOBILE_STORE_HEADER_BREAKPOINT) {
    display: none;
  }
}

 #portal-target{
  z-index: 12000;
}
</style>
