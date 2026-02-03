import { getCurrentLanguageFromSite } from '../../utils'
import { useVueBaseProps } from '@lightspeed/crane'

/**
 * Translation dictionary type
 * Maps language codes to key-value translation pairs
 */
export type TranslationDictionary = Record<string, Record<string, string>>

/**
 * Creates a translation helper function for the current language
 *
 * Automatically detects the current language from the site context
 * and provides a `t()` function for translating keys.
 * Falls back to English if the current language is not available.
 *
 * @template T - Type of the translations object
 * @param translations - Object with language codes as keys and translation objects as values
 * @returns Object with `t` function and `currentLang` string
 *
 * @example
 * ```typescript
 * // In settings/translations.ts:
 * export default {
 *   en: {
 *     '$label.loading': 'Loading...',
 *     '$label.error.title': 'Error',
 *   },
 *   de: {
 *     '$label.loading': 'Laden...',
 *     '$label.error.title': 'Fehler',
 *   },
 * }
 *
 * // In component:
 * import translations from './settings/translations'
 * const { t, currentLang } = useTranslations(translations)
 *
 * // Usage:
 * // {{ t('$label.loading') }}
 * ```
 */
export function useTranslations<T extends TranslationDictionary>(translations: T) {
	const baseProps = useVueBaseProps()
	const siteContent = baseProps.site?.value
	const currentLang = getCurrentLanguageFromSite(siteContent)

	/**
	 * Translates a key to the current language
	 * Falls back to English if translation not found
	 *
	 * @param key - Translation key (e.g., '$label.loading')
	 * @returns Translated string or the key itself if not found
	 */
	const t = (key: string): string => {
		const lang = currentLang as keyof T
		const translationObj = (translations[lang] || translations.en) as Record<string, string>
		const fallback = (translations.en as Record<string, string>)?.[key]
		return translationObj?.[key] || fallback || key
	}

	return {
		t,
		currentLang,
	}
}
