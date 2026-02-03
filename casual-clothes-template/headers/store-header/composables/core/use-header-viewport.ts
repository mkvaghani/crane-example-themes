import { ref, onMounted, onBeforeUnmount } from 'vue'
import { MOBILE_STORE_HEADER_BREAKPOINT } from '../../constants'

/**
 * Composable for viewport/breakpoint detection
 * Tracks whether the viewport is in desktop or mobile mode
 */
export function useHeaderViewport() {
	const isDesktop = ref(false)
	const isMobile = ref(true)

	const updateViewport = () => {
		// Guard against SSR where window is undefined
		// eslint-disable-next-line no-restricted-globals -- SSR-safe: explicit typeof check
		if (typeof window === 'undefined') {
			return
		}
		// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded above
		const width = window.innerWidth
		isDesktop.value = width > MOBILE_STORE_HEADER_BREAKPOINT
		isMobile.value = width <= MOBILE_STORE_HEADER_BREAKPOINT
	}

	onMounted(() => {
		// Initialize on mount
		updateViewport()
		// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside onMounted
		window.addEventListener('resize', updateViewport)
	})

	onBeforeUnmount(() => {
		// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside onBeforeUnmount
		window.removeEventListener('resize', updateViewport)
	})

	return {
		isDesktop,
		isMobile,
	}
}
