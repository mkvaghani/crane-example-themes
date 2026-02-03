import { ref, watch, onMounted, type Ref } from 'vue'

/**
 * Composable to calculate and track desktop submenu position
 * Positions submenu directly below the specified container or header row
 * 
 * @param isOpen - Ref or getter function that returns whether the submenu is open
 * @param containerSelector - CSS selector for the container to position below (defaults to entire header)
 * @returns The calculated top offset as a CSS string (e.g., "120px")
 */
export function useSubmenuPosition(
	isOpen: Ref<boolean> | (() => boolean),
	containerSelector: string = '.custom-header',
) {
	const submenuTopOffset = ref('0px')
	const isMounted = ref(false)

	const calculateTopOffset = () => {
		// SSR guard: document is not available on server
		// eslint-disable-next-line no-restricted-globals -- SSR-safe: typeof check
		if (typeof document === 'undefined') {
			return '0px'
		}

		// Try to get the specific container first (e.g., top row)
		// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded above
		let container = document.querySelector(containerSelector)

		// Fallback to entire header if container not found
		if (!container) {
			// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded above
			container = document.querySelector('.custom-header')
		}

		if (!container) {
			return '0px'
		}

		const containerRect = container.getBoundingClientRect()
		// Position submenu at the bottom of the container
		return `${containerRect.bottom}px`
	}

	// Watch for open state changes
	const isOpenValue = typeof isOpen === 'function' ? isOpen : () => isOpen.value

	watch(
		isOpenValue,
		(open) => {
			if (open && isMounted.value) {
				submenuTopOffset.value = calculateTopOffset()
			}
		},
		{ immediate: false },
	)

	// Calculate initial position on mount
	onMounted(() => {
		isMounted.value = true
		// Calculate initial position if already open
		if (isOpenValue()) {
			submenuTopOffset.value = calculateTopOffset()
		}
	})

	return {
		submenuTopOffset,
	}
}
