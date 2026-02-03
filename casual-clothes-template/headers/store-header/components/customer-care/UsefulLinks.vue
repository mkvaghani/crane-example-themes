<template>
	<div class="useful-links">
		<div class="useful-links__section-title">
			{{ translate('$label.customer_care.useful_links_title', 'Useful Links') }}
		</div>
		<a
			v-for="(link, index) in usefulLinks"
			:key="`link-${index}`"
			:href="link.url"
			class="useful-links__section-link"
			:class="{ 'useful-links__section-link--no-link': !link.url }">
			{{ link.title }}
		</a>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDeckElementContent } from '@lightspeed/crane'
import { useMappedDeckCards } from '../../../../shared/composables'
import { useHeaderTranslations, useHeaderDesign } from '../../composables'
import type { Content } from '../../type'
import {
	UsefulLinksCard,
	UsefulLinksDeckConfig,
} from '../../types/customer-care'

const { translate } = useHeaderTranslations()
const { headerTextColor, headerFontFamily, headerFontSize } = useHeaderDesign()

// Access DECK from content settings
const usefulLinksDeckRaw = useDeckElementContent<Content>('UsefulLinks')

// Map DECK cards with proper types
const usefulLinksCards = useMappedDeckCards<UsefulLinksCard, Content>(
	usefulLinksDeckRaw,
	UsefulLinksDeckConfig,
)

// Useful Links from settings
const usefulLinks = computed(() => {
	return usefulLinksCards.value.map((card) => ({
		title: card.link_title?.value || '',
		url: card.link_url?.value || '',
	}))
})
</script>

<style scoped lang="scss">
.useful-links {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
	align-self: stretch;
	flex: 1 0 auto;

	&__section-title {
		color: v-bind(headerTextColor);
		font-family: v-bind(headerFontFamily);
		font-size: clamp(16px, 1.5vw, 18px);
		font-weight: 700;
		line-height: 150%;
		letter-spacing: -0.08px;
		align-self: stretch;
		margin-bottom: 4px;
	}

	&__section-link {
		color: v-bind(headerTextColor);
		font-family: v-bind(headerFontFamily);
		font-size: v-bind(headerFontSize);
		font-weight: 400;
		line-height: 150%;
		letter-spacing: -0.08px;
		cursor: pointer;
		transition: opacity 0.2s ease;
		text-decoration: none;

		&:hover {
			opacity: 0.8;
			text-decoration: underline;
		}

		&:focus-visible {
			outline: 2px solid currentColor;
			outline-offset: 2px;
		}

		&:active {
			opacity: 0.6;
		}

		&--no-link {
			cursor: default;
			pointer-events: none;

			&:hover {
				opacity: 1;
				text-decoration: none;
			}
		}
	}
}
</style>
