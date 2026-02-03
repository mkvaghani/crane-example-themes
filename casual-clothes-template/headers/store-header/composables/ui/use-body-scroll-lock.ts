/* eslint-disable no-restricted-globals */
/**
 * Composable for managing body scroll lock when overlays are open
 *
 * This file uses browser APIs (window, document) intentionally for scroll management.
 * The eslint-disable is necessary because these APIs are used within a watch callback
 * that only runs on the client side after hydration.
 */

import { watch, type Ref } from 'vue'

/**
 * Prevents body scroll when any of the provided overlay states is true
 * Only applies on desktop viewport
 *
 * @param overlayStates - Array of refs representing overlay open states
 * @param isDesktop - Ref indicating if viewport is desktop size
 */
export function useBodyScrollLock(
	overlayStates: Ref<boolean>[],
	isDesktop: Ref<boolean>,
): void {
	watch(
		[...overlayStates, isDesktop],
		(values) => {
			const desktop = values[values.length - 1] as boolean
			const overlayValues = values.slice(0, -1) as boolean[]

			// Guard against SSR
			if (typeof window === 'undefined' || typeof document === 'undefined') return

			// Only apply on desktop (not mobile)
			if (!desktop) return

			// If any overlay is open, prevent body scroll
			const anyOverlayOpen = overlayValues.some(Boolean)

			if (anyOverlayOpen) {
				// Store original overflow value to restore later
				const originalOverflow = document.body.style.overflow
				if (!document.body.hasAttribute('data-original-overflow')) {
					document.body.setAttribute('data-original-overflow', originalOverflow || 'visible')
				}
				document.body.style.overflow = 'hidden'
			} else {
				// Restore original overflow
				const originalOverflow = document.body.getAttribute('data-original-overflow')
				if (originalOverflow !== null) {
					document.body.style.overflow = originalOverflow
					document.body.removeAttribute('data-original-overflow')
				}
			}
		},
		{ immediate: false },
	)
}
