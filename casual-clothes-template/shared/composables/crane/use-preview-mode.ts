/**
 * usePreviewMode Composable
 * 
 * Provides a consistent way to detect if the current context is in preview mode.
 * In preview mode, navigation to other pages should be blocked to prevent
 * redirecting to the published version of the site.
 * 
 * @example
 * ```typescript
 * import { usePreviewMode } from '../../shared/composables'
 * 
 * const { isPreviewMode } = usePreviewMode()
 * 
 * const handleClick = () => {
 *   if (isPreviewMode.value) return
 *   // proceed with navigation
 * }
 * ```
 */

import { computed, type ComputedRef } from 'vue'
import { useVueBaseProps } from '@lightspeed/crane'

interface UsePreviewModeReturn {
	/**
	 * Whether the current context is in preview mode.
	 * When true, navigation should be blocked.
	 */
	isPreviewMode: ComputedRef<boolean>
}

export function usePreviewMode(): UsePreviewModeReturn {
	const baseProps = useVueBaseProps()
	
	const isPreviewMode = computed(() => {
		return baseProps.site?.value?.isPreviewMode ?? false
	})

	return {
		isPreviewMode,
	}
}
