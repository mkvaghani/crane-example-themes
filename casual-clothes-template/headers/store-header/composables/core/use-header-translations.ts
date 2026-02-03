import { useVueBaseProps } from '@lightspeed/crane'
import { getCurrentLanguageFromSite, getTranslation, makeLanguageAwareUrl } from '../../../../shared/utils'
import type { Design } from '../../type'

/**
 * Composable for header translation and language utilities
 * Provides common translation functions used across header components
 */
export function useHeaderTranslations() {
	const baseProps = useVueBaseProps<unknown, Design>()
	const siteContent = baseProps.site?.value
	const lang = getCurrentLanguageFromSite(siteContent)

	/**
	 * Get a translated string with fallback
	 */
	const translate = (key: string, fallback: string) => {
		return getTranslation(key, lang, fallback)
	}

	/**
	 * Make a URL language-aware
	 */
	const makeUrlLanguageAware = (url: string) => {
		return makeLanguageAwareUrl(url, lang, siteContent?.languages)
	}

	// Common translations used across header components
	const translations = {
		account: translate('$label.profile_button.label', 'Account'),
		cart: translate('$label.cart_button.label', 'Cart'),
		favorites: translate('$label.favorites_button.label', 'Favorites'),
		search: translate('$label.search_button.label', 'Search'),
		catalog: translate('$label.catalog_button.label', 'Catalog'),
		back: translate('$label.back_button.label', 'Go back'),
	}

	return {
		lang,
		siteContent,
		translate,
		makeUrlLanguageAware,
		translations,
	}
}

/**
 * Get translated text for common header elements
 */
export function getHeaderTranslatedText(
	translate: (key: string, fallback: string) => string,
) {
	return {
		account: translate('header.account', 'Account'),
		cart: translate('header.cart', 'Cart'),
		search: translate('header.search', 'Search'),
		wishlist: translate('header.wishlist', 'Wishlist'),
		menu: translate('header.menu', 'Menu'),
		close: translate('header.close', 'Close'),
	}
}
