<template>
	<section class="social-media-gallery" :style="sectionBackgroundStyle">
		<div class="social-media-gallery__wrapper">
			<MediaHeader />

			<div class="social-media-gallery__container">
				<div
					ref="gallery"
					class="social-media-gallery__gallery"
					:class="{ 'social-media-gallery__gallery--centered': !hasOverflow }"
					role="region"
					aria-label="Social media gallery"
				>
					<GalleryItem
						v-for="item in galleryItems"
						:key="item.id"
						:image-url="item.imageUrl"
						:username="item.username"
						:alt-text="item.altText"
						:username-style="usernameStyle"
					/>
				</div>

				<NavigationButtons
					v-if="shouldShowControls"
					:prev-disabled="prevDisabled"
					:next-disabled="nextDisabled"
					:prev-label="t('$label.nav.previous')"
					:next-label="t('$label.nav.next')"
					padding-mobile="-8px"
					padding-desktop="0"
					icon-size="md"
					:show-hover="false"
					@prev="scrollCarousel('prev')"
					@next="scrollCarousel('next')"
				/>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
	useDeckElementContent,
	useBackgroundElementDesign,
	useTextElementDesign,
} from '@lightspeed/crane'
import GalleryItem from './components/GalleryItem.vue'
import NavigationButtons from '../../shared/components/NavigationButtons.vue'
import { useCarousel, useBackgroundStyle, useTranslations, useMappedDeckCards } from '../../shared/composables'
import { isValidImageUrl } from '../../shared/utils'
import { GalleryItemCard, GalleryItemDeckConfig } from './types'
import translations from './settings/translations'
import type { Content, Design } from './type'
import { createTextStyle } from '../../shared/utils'
import MediaHeader from './components/MediaHeader.vue'

// Translation helper with current language
const { t } = useTranslations(translations)

// Content - Gallery items from DECK
const galleryItemsDeck = useDeckElementContent<Content>('gallery_items')
const mappedGalleryItems = useMappedDeckCards<GalleryItemCard, Content>(
	galleryItemsDeck,
	GalleryItemDeckConfig,
)

// Transform gallery items to component props
const galleryItems = computed(() => {
	return mappedGalleryItems.value.map((item) => ({
		id: item.id,
		imageUrl: isValidImageUrl(item.image?.highResolutionDesktopImage),
		username: item.username?.value || '',
		altText: item.alt_text?.value || '',
	}))
})

// Design
const sectionBackgroundDesign = useBackgroundElementDesign<Design>('section_background') as BackgroundDesignData
const usernameDesign = useTextElementDesign<Design>('gallery_item_username') as TextDesignData

// Background style using shared composable
const sectionBackgroundStyle = useBackgroundStyle(sectionBackgroundDesign)

// Text styles using shared utility
const usernameStyle = computed(() => createTextStyle(usernameDesign, { defaultSize: 16 }))

// Gallery navigation
const gallery = ref<HTMLElement | null>(null)
const totalItems = computed(() => galleryItems.value.length)
const { prevDisabled, nextDisabled, scrollCarousel, shouldShowControls, hasOverflow } = useCarousel(gallery, {
	totalItems,
	itemWidthMobile: 216,
	itemWidthDesktop: 340,
	gap: 16,
})
</script>

<style scoped>
.social-media-gallery {
	width: 100%;
	padding: 32px 8px;
	background: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 32px;
}

.social-media-gallery__wrapper {
	width: 100%;
	max-width: 1440px;
	display: flex;
	flex-direction: column;
	gap: 32px;
}

.social-media-gallery__container {
	position: relative;
}

.social-media-gallery__gallery {
	display: flex;
	gap: 16px;
	overflow-x: auto;
	scroll-behavior: smooth;
	scrollbar-width: none;
	scroll-snap-type: x mandatory;
}

.social-media-gallery__gallery--centered {
	justify-content: center; /* Center items only when there's no overflow */
}

.social-media-gallery__gallery::-webkit-scrollbar {
	display: none;
}

@media (min-width: 768px) {
	.social-media-gallery {
		padding: 48px 16px;
	}

	.social-media-gallery__wrapper {
		padding: 0 16px;
	}
}
</style>
