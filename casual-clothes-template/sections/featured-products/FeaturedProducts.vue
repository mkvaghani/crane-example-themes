<template>
	<SectionWrapper :style="backgroundStyle">
		<SectionHeader
			:title="sectionTitle"
			:description="sectionDescription"
			:title-design="sectionTitleDesign"
			:description-design="sectionDescriptionDesign"
		/>

		<!-- Loading State -->
		<LoadingSkeleton v-if="isLoading" />

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

		<!-- Products grid -->
		<ProductsGrid
			v-else
			:products="products"
		/>
	</SectionWrapper>
</template>

<script setup lang="ts">
import {
	useInputboxElementContent,
	useBackgroundElementDesign,
	useTextElementDesign,
} from '@lightspeed/crane'
import type { Content, Design } from './type'
import translations from './settings/translations'
import SectionWrapper from '../../shared/components/SectionWrapper.vue'
import SectionHeader from '../../shared/components/SectionHeader.vue'
import EmptyState from '../../shared/components/EmptyState.vue'
import ErrorState from '../../shared/components/ErrorState.vue'
import { useProducts, useBackgroundStyle, useTranslations } from '../../shared/composables'
import { PRODUCTS_LIMITS } from '../../shared/constants'
import LoadingSkeleton from './components/LoadingSkeleton.vue'
import ProductsGrid from './components/ProductsGrid.vue'

// Translation helper with current language
const { t } = useTranslations(translations)

// Fetch real products from store
const { products, isLoading, hasError, errorMessage } = useProducts<Content, Design>(() => true, PRODUCTS_LIMITS.FEATURED)

// Content
const sectionTitle = useInputboxElementContent<Content>('section_title')
const sectionDescription = useInputboxElementContent<Content>('section_description')

// Background style using shared composable
const backgroundDesign = useBackgroundElementDesign<Design>('background') as BackgroundDesignData
const backgroundStyle = useBackgroundStyle(backgroundDesign)

// Design elements
const sectionTitleDesign = useTextElementDesign<Design>('section_title') as TextDesignData
const sectionDescriptionDesign = useTextElementDesign<Design>('section_description') as TextDesignData
</script>
