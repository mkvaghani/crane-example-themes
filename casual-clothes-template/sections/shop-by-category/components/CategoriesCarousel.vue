<template>
	<div class="categories-container">
		<div
			ref="carousel"
			class="categories-grid"
			:class="{ 'categories-grid--centered': !hasOverflow }"
			role="region"
			aria-label="Categories carousel"
		>
			<div
				v-for="cat in categories"
				:key="cat.id"
				class="category-card"
				@click="openCategoryUrl(cat)"
			>
				<div class="category-card__image-wrapper">
					<img
						v-if="hasValidCategoryImage(cat)"
						:src="cat.content?.highResolutionDesktopImage"
						alt=""
						class="category-card__image"
					/>
				</div>
				<p class="category-card__text" :style="textStyle">
					{{ cat.text?.value }}
				</p>
			</div>
		</div>

		<NavigationButtons
			v-if="shouldShowControls"
			:prev-disabled="prevDisabled"
			:next-disabled="nextDisabled"
			:prev-label="'Previous'"
			:next-label="'Next'"
			padding-mobile="0"
			padding-desktop="0"
			icon-size="md"
			:show-hover="true"
			@prev="scrollCarousel('prev')"
			@next="scrollCarousel('next')"
		/>
	</div>
</template>

<script setup lang="ts">
import { CategoryCard } from '../types'
import { computed, ref } from 'vue'
import { getColorHex, openCategoryLink } from '../../../shared/utils'
import { TextDesignDataInternal } from '../../../shared/types/type.ts'
import { useCarousel } from '../../../shared/composables'
import NavigationButtons from '../../../shared/components/NavigationButtons.vue'

interface Props {
  categories: CategoryCard[]
  categoryTextDesign?: TextDesignDataInternal
  currentLanguage?: string
}

const props = defineProps<Props>()

// Helper function to check if category image is valid
const hasValidCategoryImage = (cat: CategoryCard): boolean => {
	const imageUrl = cat.content?.highResolutionDesktopImage
	return !!(imageUrl && imageUrl !== '/undefined' && imageUrl !== 'undefined' && !imageUrl.includes('undefined'))
}

// Carousel navigation
const carousel = ref<HTMLElement | null>(null)
const totalItems = computed(() => props.categories.length)
const { prevDisabled, nextDisabled, scrollCarousel, shouldShowControls, hasOverflow } = useCarousel(carousel, {
	totalItems,
	itemWidthMobile: 144,
	itemWidthDesktop: 340,
	gap: 16,
	isInfinite: true,
})

const textStyle = computed(() => ({
	fontFamily: props.categoryTextDesign?.font || 'Inter',
	fontSize: props.categoryTextDesign?.size ? `${props.categoryTextDesign.size}px` : '16px',
	color: getColorHex(props.categoryTextDesign?.color) || '#000000',
	fontWeight: props.categoryTextDesign?.bold ? 'bold' : 'normal',
	fontStyle: props.categoryTextDesign?.italic ? 'italic' : 'normal',
	lineHeight: '1.5',
	letterSpacing: '-0.08px',
	display: props.categoryTextDesign?.visible ? '' : 'none',
}))

const openCategoryUrl = (cat: CategoryCard) => {
	openCategoryLink(cat.link?.value, props.currentLanguage || 'en')
}
</script>

<style scoped>
/* Container for carousel and navigation */
.categories-container {
	position: relative;
	width: 100%;
}

/* Mobile: 2-column wrapped grid */
.categories-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	width: 304px; /* 2 columns of 144px + 16px gap */
	margin: 0 auto;
}

.category-card {
	width: 144px;
	display: flex;
	flex-direction: column;
	gap: 16px;
	cursor: pointer;
}

.category-card__image-wrapper {
	width: 100%;
	aspect-ratio: 1/1;
	overflow: hidden;
	position: relative;
}

.category-card__image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
}

.category-card__text {
	font-family: 'Inter', sans-serif;
	font-size: 16px;
	font-weight: 400;
	line-height: 1.5;
	letter-spacing: -0.08px;
	color: #000000;
	margin: 0;
}

/* Desktop: horizontal scroll with hidden scrollbar */
@media (min-width: 768px) {
	.categories-grid {
		width: 100%;
		flex-wrap: nowrap;
		overflow-x: auto;
		overflow-y: hidden;
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		padding: 0 16px;
		scroll-snap-type: none; /* Disable snap on desktop for smoother programmatic scrolling */
	}

	.categories-grid--centered {
		justify-content: center; /* Center items only when there's no overflow on desktop */
	}

	/* Hide scrollbar */
	.categories-grid::-webkit-scrollbar {
		display: none;
	}

	.category-card {
		flex: 0 0 340px;
		width: 340px;
		min-width: 340px;
		max-width: 340px;
	}
}
</style>
