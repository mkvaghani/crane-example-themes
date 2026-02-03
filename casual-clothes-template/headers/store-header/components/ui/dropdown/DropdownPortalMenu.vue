<template>
	<component
		:is="dropdownComponent"
		v-model="isDropdownOpen"
	>
		<template #trigger >
			<slot name="trigger" :isDropdownOpen="isDropdownOpen" :isTouchDevice="isTouchDevice" />
		</template>
		<template #content>
			<slot name="content" />
		</template>
	</component>

</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import { useMediaQuery } from '@vueuse/core'
import DropdownPortalDesktop from './DropdownPortalDesktop.vue'
import DropdownPortalMobile from './DropdownPortalMobile.vue'

const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)')

const dropdownComponent = computed(() =>
	isTouchDevice.value ?  DropdownPortalMobile : DropdownPortalDesktop,
)

const isDropdownOpen = ref(false)

//Editor Hack, Important - don't remove
watch(isDropdownOpen, (newValue) => {
	// SSR guard: document is not available on server
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: typeof check
	if (typeof document === 'undefined') return

	// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded above
	const borderBottom = document.querySelector('.ins-tile-clicked-border__bottom') as HTMLElement

	if (borderBottom) {
		borderBottom.style.display = newValue ? 'none' : ''
	}
})

//Preview Hack, Important - don't remove
onMounted(() => {
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside onMounted
	const element = document.querySelector('[tile-type="CUSTOM_HEADER"]') as HTMLElement

	if (element) {
		element.style.zIndex = '4'
	}
})
</script>

<style scoped>

</style>
