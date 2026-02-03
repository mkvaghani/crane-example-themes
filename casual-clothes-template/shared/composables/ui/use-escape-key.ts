import { onMounted, onUnmounted } from 'vue'

/**
 * Composable for handling Escape key press
 * Automatically sets up and cleans up event listeners
 * 
 * @param callback - Function to call when Escape is pressed
 * @param condition - Optional reactive condition to check before calling callback
 */
export function useEscapeKey(
	callback: () => void,
	condition?: () => boolean,
) {
	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			// Check condition if provided, otherwise always execute
			if (!condition || condition()) {
				callback()
			}
		}
	}

	onMounted(() => {
		// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside onMounted
		document.addEventListener('keydown', handleKeydown)
	})

	onUnmounted(() => {
		// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside onUnmounted
		document.removeEventListener('keydown', handleKeydown)
	})
}
