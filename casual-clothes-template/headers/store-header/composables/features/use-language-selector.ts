import { useVueBaseProps } from '@lightspeed/crane'
import type { Design } from '../../type'

/**
 * Language interface for multi-language support
 */
export interface Language {
	code: string
	selected: boolean
	main?: boolean
	url?: string
}

// Map 2-letter language codes to 3-letter codes
const languageCodeMap: Record<string, string> = {
	'en': 'ENG',
	'nl': 'NLD',
	'fr': 'FRA',
	'de': 'DEU',
	'it': 'ITA',
	'es': 'ESP',
	'de_CH': 'DEU(CH)',
	'es_419': 'ESP(LATAM)',
	'pt_BR': 'POR(BR)',
}

export function useLanguageSelector() {
	const baseProps = useVueBaseProps<unknown, Design>()
	const siteContent = baseProps.site?.value
	const isPreviewMode = siteContent.isPreviewMode ?? false

	const getDisplayLanguageCode = (code: string): string => {
		return languageCodeMap[code] || code.toUpperCase()
	}

	const sortedLanguages = siteContent.languages
		? [...siteContent.languages].sort((a, b) => {
			if (a.main && !b.main) return -1
			if (!a.main && b.main) return 1
			return 0
		})
		: []

	const hasMultipleLanguages = sortedLanguages.length > 1
	const currentLanguage = sortedLanguages.find(lang => lang.selected) || sortedLanguages[0]

	const navigateToTranslationPage = (language: Language) => {
		if (language.selected || isPreviewMode) {
			return
		}
		// eslint-disable-next-line no-restricted-globals -- SSR-safe: only called on user click
		if (language.url !== undefined && typeof window !== 'undefined') {
			// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded above
			window.open(language.url, '_self')
		}
	}

	return {
		sortedLanguages,
		hasMultipleLanguages,
		currentLanguage,
		getDisplayLanguageCode,
		navigateToTranslationPage,
	}
}
