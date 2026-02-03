<template>
	<div>
		<!-- Products Container -->
		<div class="products-container">
			<div
				ref="carousel"
				class="products-carousel"
				:class="{ 'products-carousel--centered': !hasOverflow }"
				role="region"
				aria-label="Products carousel"
			>
				<div
					v-for="item in products"
					:key="item.id"
					class="product-card"
					@click="openProductUrl(item)"
				>
					<!-- Product Image Container -->
					<div class="product-card__image-wrapper">
						<!-- Product Tag (Ribbon) -->
						<Badge
							v-if="item.product_tag?.value"
							:text="item.product_tag.value"
							:color="item.product_tag.color"
							position="top-left"
							class="product-card__tag"
						/>

						<!-- Product Image -->
						<img
							v-if="hasValidImage(item)"
							:src="item.item_image?.highResolutionDesktopImage"
							alt=""
							class="product-card__image"
						/>
					</div>

					<!-- Product Info -->
					<div class="product-card__info">
						<!-- Title + Price Group -->
						<div class="product-card__name-price">
							<h3 class="product-card__title" :style="productTitleStyle">
								{{ item.item_title?.value || 'Product Name' }}
							</h3>

							<!-- Prices (inline) -->
							<div class="product-card__price">
								<span
									:style="productPriceStyle">
									{{ item.item_price?.value || '$0.00' }}
								</span>
								<span
									v-if="item.item_original_price?.value"
									:style="productSalePriceStyle"
									class="product-card__price-original">
									{{ item.item_original_price.value }}
								</span>
							</div>
						</div>

						<!-- Rating (only show if data available) -->
						<div v-if="item.item_rating?.hasContent" class="product-card__rating">
							<RatingStars :rating="getProductRating(item)" />
						</div>
					</div>
				</div>
			</div>

			<NavigationButtons
				v-if="shouldShowControls"
				:prev-disabled="prevDisabled"
				:next-disabled="nextDisabled"
				:prev-label="prevLabel"
				:next-label="nextLabel"
				padding-mobile="34px"
				padding-desktop="34px"
				icon-size="md"
				:show-hover="false"
				@prev="scrollCarousel('prev')"
				@next="scrollCarousel('next')"
			/>
		</div>

		<!-- Button -->
		<div v-if="button?.hasTitle && buttonDesign?.visible" class="carousel-button">
			<Button
				:content="button"
				:design="buttonDesign"
				show-arrow
				class="carousel-button__btn"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ProductCard } from '../types'
import NavigationButtons from '../../../shared/components/NavigationButtons.vue'
import RatingStars from '../../testimonials/components/RatingStars.vue'
import Badge from '../../../shared/components/Badge.vue'
import Button from '../../../shared/components/Button.vue'
import { useCarousel } from '../../../shared/composables'
import { getColorHex, openProductLink, hasValidImageContent } from '../../../shared/utils'

interface ButtonContentProp {
	title?: string;
	hasTitle?: boolean;
	performAction?: () => void;
}

interface Props {
	products: ProductCard[]
	productTitleDesign?: TextDesignData
	productPrice?: TextDesignData
	productPriceSale?: TextDesignData
	button?: ButtonContentProp
	buttonDesign?: ButtonDesignData
	prevLabel?: string
	nextLabel?: string
	currentLanguage?: string
}

const props = defineProps<Props>()

// Helper function to check if image is valid
const hasValidImage = (item: ProductCard): boolean => hasValidImageContent(item.item_image)

// Carousel navigation
const carousel = ref<HTMLElement | null>(null)
const totalItems = computed(() => props.products.length)
const { prevDisabled, nextDisabled, scrollCarousel, shouldShowControls, hasOverflow } = useCarousel(carousel, {
	totalItems,
	itemWidthMobile: 200,
	itemWidthDesktop: 400,
	gap: 16,
	isInfinite: true,
})

// Product title styling
const productTitleStyle = computed(() => ({
	fontFamily: props.productTitleDesign?.font || 'Inter',
	fontSize: props.productTitleDesign?.size ? `${props.productTitleDesign.size}px` : '16px',
	color: getColorHex(props.productTitleDesign?.color) || '#000000',
	fontWeight: props.productTitleDesign?.bold ? 'bold' : '400',
	fontStyle: props.productTitleDesign?.italic ? 'italic' : 'normal',
	lineHeight: '1.5',
	letterSpacing: '-0.08px',
	display: props.productTitleDesign?.visible ? '' : 'none',
}))

// Hybrid approach: :style for dynamic, CSS for static
const productPriceStyle = computed(() => ({
	fontFamily: props.productPrice?.font || 'Inter',
	fontSize: props.productPrice?.size ? `${props.productPrice.size}px` : '32px',
	color: getColorHex(props.productPrice?.color),
	fontWeight: props.productPrice?.bold ? 'bold' : 'normal',
	fontStyle: props.productPrice?.italic ? 'italic' : 'normal',
	display: props.productPrice?.visible ? '' : 'none',
}))

// Hybrid approach: :style for dynamic, CSS for static
const productSalePriceStyle = computed(() => ({
	fontFamily: props.productPriceSale?.font || 'Inter',
	fontSize: props.productPriceSale?.size ? `${props.productPriceSale.size}px` : '32px',
	color: getColorHex(props.productPriceSale?.color),
	fontWeight: props.productPriceSale?.bold ? 'bold' : 'normal',
	fontStyle: props.productPriceSale?.italic ? 'italic' : 'normal',
	display: props.productPriceSale?.visible ? '' : 'none',
}))

// Rating helper
const getProductRating = (product: ProductCard): number => {
	return product.item_rating?.value ? Number(product.item_rating.value) : 0
}

// Open product URL
const openProductUrl = (product: ProductCard) => {
	openProductLink(product.item_link?.value, props.currentLanguage || 'en')
}
</script>

<style scoped>
/* Products Container */
.products-container {
	position: relative;
	width: 100%;
}

.products-carousel {
	display: flex;
	gap: 16px;
	overflow-x: auto;
	scroll-behavior: smooth;
	scrollbar-width: none;
	/* Scroll snap for mobile */
	scroll-snap-type: x mandatory;
}

.products-carousel--centered {
	justify-content: center; /* Center items only when there's no overflow */
}

.products-carousel::-webkit-scrollbar {
	display: none;
}

/* Product Card */
.product-card {
	display: flex;
	flex-direction: column;
	gap: 16px;
	cursor: pointer;
	flex-shrink: 0;
	width: 200px; /* Mobile fixed width */
	scroll-snap-align: center;
}

/* Image Container */
.product-card__image-wrapper {
	position: relative;
	width: 100%;
	aspect-ratio: 1/1.33;
	overflow: hidden;
}

.product-card__image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
}

/* Product Tag */
.product-card__tag {
	position: absolute;
	top: 0;
	left: 0;
	padding: 4px 8px;
	font-family: 'Inter', sans-serif;
	font-size: 12px;
	font-weight: 400;
	line-height: 1.5;
	letter-spacing: -0.06px;
	color: #ffffff;
	z-index: 1;
}

/* Product Info */
.product-card__info {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

/* Title + Price Group */
.product-card__name-price {
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.product-card__title {
	line-height: 1.5;
	letter-spacing: -0.08px;
	margin: 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

/* Price (inline) */
.product-card__price {
	line-height: 1.5;
	letter-spacing: -0.08px;
}

.product-card__price-original {
	color: rgba(0, 0, 0, 0.32);
	text-decoration: line-through;
  margin-left: 7px;
}

/* Button Container */
.carousel-button {
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 32px;
}

.carousel-button__btn {
	display: flex;
	width: 100%;
	flex: 1 0 0;
}

/* Desktop specific */
@media (min-width: 768px) {
	.products-carousel {
		padding: 0 16px;
		scroll-snap-type: none; /* Disable snap on desktop for smoother multi-item scroll */
	}

	.product-card {
		/* FIXED width from Figma: 340px */
		/* 4 cards at 340px + 3 gaps at 16px = 1408px total */
		flex: 0 0 340px;
		width: 340px;
		min-width: 340px;
		max-width: 340px;
		scroll-snap-align: start;
	}

	.carousel-button {
		margin-top: 64px;
	}

	.carousel-button__btn {
		display: inline-flex;
		width: auto;
		flex: 0 0 auto;
	}
}
</style>
