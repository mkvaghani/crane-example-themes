<template>
	<SectionWrapper :style="backgroundStyle">
		<!-- Section Header -->
		<SectionHeader
			:title="sectionTitle"
			:description="sectionDescription"
			:title-design="sectionTitleDesign"
			:description-design="sectionDescriptionDesign"
		/>

		<!-- Loading State -->
		<div v-if="isLoading" class="loading-skeleton">
			<div v-for="i in 4" :key="i" class="loading-skeleton__card">
				<Skeleton variant="image" height="300px" />
				<Skeleton variant="text" width="70%" class="loading-skeleton__title" />
				<Skeleton variant="text" width="50%" class="loading-skeleton__price" />
			</div>
		</div>

		<!-- Error State -->
		<ErrorState
			v-else-if="hasError"
			:message="errorMessage"
			:title="t('$label.error.title')"
			:default-message="t('$label.error.message')"
		/>

		<!-- Empty State -->
		<EmptyState
			v-else-if="products.length === 0"
			:title="t('$label.empty.title')"
			:message="t('$label.empty.message')"
		/>

		<!-- Products Carousel -->
		<ProductsCarousel
			v-else
			:products="productCards"
			:product-title-design="productTitleDesign"
			:product-price="productPriceDesign"
			:product-price-sale="productSalePriceDesign"
			:button="viewAllButton"
			:button-design="btnDesign as ButtonDesignData"
			:prev-label="t('$label.nav.previous')"
			:next-label="t('$label.nav.next')"
			:current-language="currentLang"
		/>
	</SectionWrapper>
</template>

<script setup lang="ts">
import {
	useBackgroundElementDesign,
	useButtonElementDesign,
	useButtonElementContent,
	useInputboxElementContent,
	useTextareaElementContent,
	useTextElementDesign,
	type ImageContent,
} from '@lightspeed/crane'
import { Content, Design } from './type'
import { ProductCard } from './types'
import translations from './settings/translations'

import SectionWrapper from '../../shared/components/SectionWrapper.vue'
import SectionHeader from '../../shared/components/SectionHeader.vue'
import ProductsCarousel from './components/ProductsCarousel.vue'
import EmptyState from '../../shared/components/EmptyState.vue'
import ErrorState from '../../shared/components/ErrorState.vue'
import Skeleton from '../../shared/components/Skeleton.vue'
import { computed } from 'vue'
import { useProducts, useBackgroundStyle, useTranslations } from '../../shared/composables'
import { PRODUCTS_LIMITS } from '../../shared/constants'

// Translation helper with current language
const { t, currentLang } = useTranslations(translations)

// Fetch real products from store
const { products, isLoading, hasError, errorMessage } = useProducts<Content, Design>(() => true, PRODUCTS_LIMITS.PROMOTION)

// Content
const sectionTitle = useInputboxElementContent<Content>('section_title')
const sectionDescription = useTextareaElementContent<Content>('section_description')

// Design
const sectionTitleDesign = useTextElementDesign<Design>('section_title') as TextDesignData
const sectionDescriptionDesign = useTextElementDesign<Design>('section_description') as TextDesignData
const productTitleDesign = useTextElementDesign<Design>('product_title') as TextDesignData
const productPriceDesign = useTextElementDesign<Design>('product_price') as TextDesignData
const productSalePriceDesign = useTextElementDesign<Design>('product_sale_price') as TextDesignData

// Background style using shared composable
const backgroundDesign = useBackgroundElementDesign<Design>('background') as BackgroundDesignData
const backgroundStyle = useBackgroundStyle(backgroundDesign)

const viewAllButton = useButtonElementContent<Content>('view_all_button')
const btnDesign = useButtonElementDesign<Design>('view_all_button')

// Transform real products to match ProductCard interface
const productCards = computed<ProductCard[]>(() =>
	products.value.map((product, index) => ({
		id: product.id || index,
		product_tag: product.ribbon?.text ? {
			value: product.ribbon.text,
			color: product.ribbon.color,
			hasContent: true,
		} : undefined,
		item_image: product.imageUrl ? {
			highResolutionDesktopImage: product.imageUrl,
			lowResolutionDesktopImage: product.imageUrl,
			lowResolutionMobileImage: product.imageUrl,
			highResolutionMobileImage: product.imageUrl,
			hasContent: true,
		} satisfies ImageContent : undefined,
		item_title: {
			value: product.name,
			hasContent: true,
		},
		item_price: {
			value: product.defaultDisplayedPriceFormatted,
			hasContent: true,
		},
		item_original_price: product.compareToPriceFormatted ? {
			value: product.compareToPriceFormatted,
			hasContent: true,
		} : undefined,
		item_rating: {
			value: product.averageRating ? String(product.averageRating) : '0',
			hasContent: !!product.averageRating,
		},
		item_link: {
			value: product.url,
			hasContent: true,
		},
	})),
)

</script>

<style scoped>
/* Loading Skeleton - Carousel style */
.loading-skeleton {
	display: flex;
	gap: 16px;
	overflow-x: hidden;
	padding: 20px 0;
}

.loading-skeleton__card {
	flex: 0 0 200px;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.loading-skeleton__title {
	margin-top: 12px;
}

.loading-skeleton__price {
	height: 24px;
}

@media (min-width: 768px) {
	.loading-skeleton__card {
		flex: 0 0 300px;
	}
}
</style>
