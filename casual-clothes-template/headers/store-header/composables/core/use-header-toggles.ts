import { useToggleElementDesign } from '@lightspeed/crane'
import type { Design } from '../../type'

/**
 * Composable for header feature toggles
 * Centralizes all header design toggles in one place
 */
export function useHeaderToggles() {
	const keyInfoBarShow = useToggleElementDesign<Design>('HeaderKeyInfoBar')
	const languageSwitcherShow = useToggleElementDesign<Design>('HeaderLanguageSwitcher')
	const accountShow = useToggleElementDesign<Design>('HeaderAccount')
	const wishlistShow = useToggleElementDesign<Design>('HeaderWishlist')
	const cartShow = useToggleElementDesign<Design>('HeaderCart')
	const searchShow = useToggleElementDesign<Design>('HeaderSearch')
	const categoriesShow = useToggleElementDesign<Design>('HeaderCategories')

	return {
		keyInfoBarShow,
		languageSwitcherShow,
		accountShow,
		wishlistShow,
		cartShow,
		searchShow,
		categoriesShow,
	}
}
