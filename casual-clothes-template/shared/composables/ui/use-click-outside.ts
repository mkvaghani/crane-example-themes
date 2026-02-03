import { onMounted, onBeforeUnmount, type Ref } from 'vue'

/**
 * Composable for handling click-outside events
 *
 * @param targetRef - Reference to the element to watch (or null for document-level detection)
 * @param callback - Function to call when click occurs outside the target
 * @param isActive - Function that returns whether the handler should be active
 *
 * @example
 * // Basic usage with element reference
 * const dropdownRef = ref<HTMLElement | null>(null);
 * useClickOutside(dropdownRef, () => close(), () => isOpen.value);
 *
 * @example
 * // Usage with custom detection logic (e.g., for overlays)
 * useClickOutside(
 *   null,
 *   (e) => {
 *     const target = e.target as HTMLElement;
 *     if (target.closest('.overlay') && !target.closest('.content')) {
 *       close();
 *     }
 *   },
 *   () => isOpen.value
 * );
 */
export function useClickOutside(
	targetRef: Ref<HTMLElement | null> | null,
	callback: (event: MouseEvent) => void,
	isActive?: () => boolean,
) {
	const handleClick = (event: MouseEvent) => {
		// Check if handler should be active
		if (isActive && !isActive()) {
			return
		}

		// If no target ref provided, let callback handle detection
		if (!targetRef) {
			callback(event)
			return
		}

		// If target ref provided, check if click is outside
		const target = event.target as HTMLElement
		const element = targetRef.value

		if (element && !element.contains(target)) {
			callback(event)
		}
	}

	onMounted(() => {
		// Use capture phase to ensure we catch clicks before they're handled
		// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside onMounted
		document.addEventListener('click', handleClick, true)
	})

	onBeforeUnmount(() => {
		// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside onBeforeUnmount
		document.removeEventListener('click', handleClick, true)
	})
}
