import { isValidImageUrl } from '../../../shared/utils'
import { GalleryItemCard } from '../types'

export function mapGalleryItem(item: GalleryItemCard) {
	return {
		id: item.id,
		imageUrl: isValidImageUrl(item.image?.highResolutionDesktopImage),
		altText: item.alt_text?.value || '',
	}
}
