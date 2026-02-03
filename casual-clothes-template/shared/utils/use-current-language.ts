import { useVueBaseProps } from '@lightspeed/crane'
import { computed } from 'vue'

/**
 * Get current selected language code from site languages
 *
 * @param languages - Array of available languages from site content
 * @returns Current language code (e.g., 'en', 'nl', 'fr') or undefined
 */
export function getCurrentLanguageCode(languages: Language[] | undefined): string | undefined {
	if (!languages || languages.length === 0) {
		return undefined
	}

	// Find the selected language
	const selectedLanguage = languages.find(lang => lang.selected)

	return selectedLanguage?.code
}

export function useCurrentLanguage<T, D>() {
	// Get base props to access site content and languages
	const baseProps = useVueBaseProps<T, D>()
	const siteContent = computed(() => baseProps.site?.value)
	const currentLanguage = computed(() => getCurrentLanguageCode(siteContent.value?.languages))
	return {
		currentLanguage,
	}
}
