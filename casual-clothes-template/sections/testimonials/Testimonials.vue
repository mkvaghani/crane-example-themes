<template>
	<section-wrapper :style="backgroundStyle">
		<SectionHeader
			:title="sectionTitle"
			:description="null"
			:title-design="sectionTitleDesign"
		>
		</SectionHeader>

		<ReviewedBy
			:cards="testimonialCards"
			:reviewer-name-design="reviewerNameDesign"
			:review-text-design="reviewTextDesign"
		>
		</ReviewedBy>
	</section-wrapper>
</template>

<script setup lang="ts">
import ReviewedBy from './components/ReviewedBy.vue'
import SectionWrapper from '../../shared/components/SectionWrapper.vue'
import { Content, Design } from './type'
import {
	useBackgroundElementDesign,
	useDeckElementContent,
	useInputboxElementContent,
	useTextElementDesign,
} from '@lightspeed/crane'
import { useMappedDeckCards, useBackgroundStyle } from '../../shared/composables'
import { TestimonialCard, TestimonialDeckConfig } from './types'
import SectionHeader from '../../shared/components/SectionHeader.vue'

// Content
const sectionTitle = useInputboxElementContent<Content>('sectionTitle')
const reviewsRaw = useDeckElementContent<Content>('reviews')

// Design
const sectionTitleDesign = useTextElementDesign<Design>('section_title') as TextDesignData
const reviewerNameDesign = useTextElementDesign<Design>('reviewer_name') as TextDesignData
const reviewTextDesign = useTextElementDesign<Design>('review_text') as TextDesignData

// Background style using shared composable
const backgroundDesign = useBackgroundElementDesign<Design>('background') as BackgroundDesignData
const backgroundStyle = useBackgroundStyle(backgroundDesign)

// Map deck cards to testimonial format
const testimonialCards = useMappedDeckCards<TestimonialCard, Content>(reviewsRaw, TestimonialDeckConfig)

</script>

<style lang="scss" scoped>
:deep(.section) {
	@media (min-width: 768px) {
		padding: 32px 32px 100px 32px;
	}
}

/* Allow testimonials to expand beyond standard max-width on large screens */
:deep(.section__wrapper) {
	@media (min-width: 2000px) {
		max-width: 100%;
		padding: 0 32px;
	}
}
</style>
