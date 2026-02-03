<template>
	<SectionWrapper :style="backgroundStyle">
		<SectionHeader
			:title="sectionTitle"
			:description="sectionDescription"
			:title-design="sectionTitleDesign as TextDesignData"
			:description-design="sectionDescriptionDesign as TextDesignData"
		>
		</SectionHeader>

		<!-- Loading State -->
		<div v-if="isLoading" class="loading-skeleton">
			<div v-for="i in 4" :key="i" class="loading-skeleton__card">
				<Skeleton
					variant="circle"
					width="120px"
					height="120px"
					class="loading-skeleton__image" />
				<Skeleton variant="text" width="80px" class="loading-skeleton__text" />
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
			v-else-if="apiCategories.length === 0"
			:title="t('$label.empty.title')"
			:message="t('$label.empty.message')"
		/>

		<!-- Categories Carousel -->
		<CategoriesCarousel
			v-else
			:categories="categoryCards"
			:category-text-design="categoryTextDesign as TextDesignData"
			:current-language="currentLang"
		>
		</CategoriesCarousel>
	</SectionWrapper>
</template>

<script setup lang="ts">
import {
	useBackgroundElementDesign,
	useInputboxElementContent,
	useTextareaElementContent,
	useTextElementDesign,
} from '@lightspeed/crane'
import { Content, Design } from './type.ts'
import translations from './settings/translations'
import SectionWrapper from '../../shared/components/SectionWrapper.vue'
import { CategoryCard } from './types'
import CategoriesCarousel from './components/CategoriesCarousel.vue'
import SectionHeader from '../../shared/components/SectionHeader.vue'
import EmptyState from '../../shared/components/EmptyState.vue'
import ErrorState from '../../shared/components/ErrorState.vue'
import Skeleton from '../../shared/components/Skeleton.vue'
import { computed } from 'vue'
import { useBackgroundStyle, useTranslations, useCategories } from '../../shared/composables'
import { CATEGORIES_LIMIT } from '../../shared/constants'

// Translation helper with current language
const { t, currentLang } = useTranslations(translations)

// Fetch real categories from store
const { categories: apiCategories, isLoading, hasError, errorMessage } = useCategories<Content, Design>(CATEGORIES_LIMIT)

// Content
const sectionTitle = useInputboxElementContent<Content>('section_title')
const sectionDescription = useTextareaElementContent<Content>('section_description')

// Design
const sectionTitleDesign = useTextElementDesign<Design>('section_title')
const sectionDescriptionDesign = useTextElementDesign<Design>('section_description')
const categoryTextDesign = useTextElementDesign<Design>('category_text')

// Background style using shared composable
const backgroundDesign = useBackgroundElementDesign<Design>('background') as BackgroundDesignData
const backgroundStyle = useBackgroundStyle(backgroundDesign)

// Map API categories to CategoryCard format
const categoryCards = computed<CategoryCard[]>(() => {
	return apiCategories.value.map((category) => ({
		id: category.id,
		content: {
			hasContent: !!category.imageUrl,
			highResolutionDesktopImage: category.imageUrl || '',
			lowResolutionDesktopImage: category.imageUrl || '',
			highResolutionMobileImage: category.imageUrl || '',
			lowResolutionMobileImage: category.imageUrl || '',
			mobileImage: category.imageUrl || '',
			desktopImage: category.imageUrl || '',
		},
		text: {
			value: category.name,
			hasContent: true,
		},
		link: {
			value: category.url || '#',
			hasContent: true,
		},
	}))
})

</script>

<style lang="scss" scoped>
/* Loading Skeleton - Category carousel style */
.loading-skeleton {
	display: flex;
	justify-content: center;
	gap: 24px;
	padding: 40px 20px;
	overflow-x: hidden;
}

.loading-skeleton__card {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
}

.loading-skeleton__image {
	flex-shrink: 0;
}

.loading-skeleton__text {
	height: 16px;
}

@media (min-width: 768px) {
	.loading-skeleton {
		gap: 40px;
	}
}
</style>
