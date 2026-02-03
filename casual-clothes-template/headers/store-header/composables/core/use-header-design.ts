import { computed } from 'vue'
import { useBackgroundElementDesign, useTextElementDesign } from '@lightspeed/crane'
import { Design } from '../../type'
import { getColorHex } from '../../../../shared/utils'
import { getBackgroundValue } from '../../../../shared/composables'

/**
 * Composable for header design settings
 * Provides access to dynamic HeaderBackground and HeaderText settings
 */
export function useHeaderDesign() {
	const menuBackground = useBackgroundElementDesign<Design>('HeaderBackground') as BackgroundDesignData
	const menuText = useTextElementDesign<Design>('HeaderText')

	const headerBackgroundColor = computed(() => {
		return getBackgroundValue(menuBackground, '#FFFFFF')
	})

	const headerTextColor = computed(() => {
		return getColorHex(menuText?.color) || '#1E1E21'
	})

	const headerFontFamily = computed(() => {
		return menuText?.font === 'global.fontFamily.body' ? 'system-ui, -apple-system, sans-serif' : menuText?.font || 'Inter'
	})

	const headerFontSize = computed(() => {
		return `${menuText?.size || 16}px`
	})

	const headerFontWeight = computed(() => {
		return menuText?.bold ? 700 : 400
	})

	const headerFontStyle = computed(() => {
		return menuText?.italic ? 'italic' : 'normal'
	})

	return {
		headerBackgroundColor,
		headerTextColor,
		headerFontFamily,
		headerFontSize,
		headerFontWeight,
		headerFontStyle,
	}
}
