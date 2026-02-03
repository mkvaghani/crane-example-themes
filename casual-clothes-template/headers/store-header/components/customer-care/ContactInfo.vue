<template>
	<div class="contact-info">
		<div class="contact-info__section-title">
			{{ translate('$label.customer_care.contact_us_title', 'Contact Us') }}
		</div>
		<a
			v-for="(contact, index) in contactUsInfo"
			:key="`contact-${index}`"
			:href="contact.link"
			class="contact-info__section-link"
			:class="{ 'contact-info__section-link--no-link': !contact.link }">
			{{ contact.value }}
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
	ContactUsInfoCard,
	ContactUsInfoDeckConfig,
} from '../../types/customer-care'

const { translate } = useHeaderTranslations()
const { headerTextColor, headerFontFamily, headerFontSize } = useHeaderDesign()

// Access DECK from content settings
const contactUsInfoDeckRaw = useDeckElementContent<Content>('ContactUsInfo')

// Map DECK cards with proper types
const contactUsInfoCards = useMappedDeckCards<ContactUsInfoCard, Content>(
	contactUsInfoDeckRaw,
	ContactUsInfoDeckConfig,
)

// Helper function to create appropriate link based on content
const createLink = (value: string): string => {
	if (!value) return ''

	// Check if it's an email (contains @ and no spaces)
	if (value.includes('@') && !value.includes(' ')) {
		return `mailto:${value}`
	}

	// Check if it's a phone number (contains only digits, spaces, +, -, (, ))
	if (/^[\d\s+\-()]+$/.test(value)) {
		// Remove all non-digit characters except +
		const cleanPhone = value.replace(/[\s\-()]/g, '')
		return `tel:${cleanPhone}`
	}

	// Otherwise return as is (might be a URL or other text)
	return value.startsWith('http') ? value : ''
}

// Contact Us Information from settings
const contactUsInfo = computed(() => {
	return contactUsInfoCards.value.map((card) => {
		const value = card.contact_value?.value || ''
		return {
			value,
			link: createLink(value),
		}
	})
})
</script>

<style scoped lang="scss">
.contact-info {
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
