<template>
	<div class="contact-form">
		<div class="contact-form__section-title">
			{{ translate('$label.customer_care_form.section_title', 'Message Us') }}
		</div>
		<form class="contact-form__form" @submit.prevent="handleSubmit">
			<div class="contact-form__field">
				<input
					v-model="formData.name"
					type="text"
					:placeholder="translate('$label.customer_care_form.name_placeholder', 'First & Last Name')"
					class="contact-form__input"
					:class="{ 'contact-form__input--error': errors.name }"
					:disabled="state === 'loading' || state === 'success'"
					@input="clearFieldError('name')" />
				<span class="contact-form__error">{{ errors.name || '' }}</span>
			</div>

			<div class="contact-form__field">
				<input
					v-model="formData.email"
					type="email"
					:placeholder="translate('$label.customer_care_form.email_placeholder', 'Email Address')"
					class="contact-form__input"
					:class="{ 'contact-form__input--error': errors.email }"
					:disabled="state === 'loading' || state === 'success'"
					@input="clearFieldError('email')" />
				<span class="contact-form__error">{{ errors.email || '' }}</span>
			</div>

			<div class="contact-form__field">
				<input
					v-model="formData.phone"
					type="tel"
					:placeholder="translate('$label.customer_care_form.phone_placeholder', 'Phone (optional)')"
					class="contact-form__input"
					:class="{ 'contact-form__input--error': errors.phone }"
					:disabled="state === 'loading' || state === 'success'"
					@input="clearFieldError('phone')" />
				<span class="contact-form__error">{{ errors.phone || '' }}</span>
			</div>

			<div class="contact-form__field">
				<textarea
					v-model="formData.message"
					:placeholder="translate('$label.customer_care_form.message_placeholder', 'Message')"
					class="contact-form__textarea"
					:class="{ 'contact-form__textarea--error': errors.message }"
					:disabled="state === 'loading' || state === 'success'"
					@input="clearFieldError('message')"></textarea>
				<span class="contact-form__error">{{ errors.message || '' }}</span>
			</div>

			<!-- Honeypot field for spam protection (hidden from users) -->
			<input
				v-model="honeypot"
				type="text"
				name="website"
				class="contact-form__honeypot"
				tabindex="-1"
				autocomplete="off"
				aria-hidden="true" />

			<button
				type="submit"
				class="contact-form__submit-button"
				:class="{
					'contact-form__submit-button--loading': state === 'loading',
					'contact-form__submit-button--success': state === 'success'
				}"
				:disabled="state === 'loading' || state === 'success'">
				<span v-if="state === 'loading'">{{ translate('$label.customer_care_form.submit_button_loading', 'Sending...')
				}}</span>
				<span v-else-if="state === 'success'">{{ translate('$label.customer_care_form.submit_button_success', 'Sent!')
				}}</span>
				<span v-else>{{ translate('$label.customer_care_form.submit_button', 'Submit') }}</span>
			</button>

			<!-- Success message (appears after button) -->
			<div v-if="state === 'success'" class="contact-form__success">
				<span class="contact-form__success-text">
					{{ translate('$label.customer_care_form.success_message',
						'Thank you! Your message has been sent successfully. We\'ll get back to you soon.') }}
				</span>
				<button
					type="button"
					class="contact-form__success-close"
					:aria-label="translate('$label.customer_care_form.close_success', 'Close success message')"
					@click="dismissSuccess"
					v-html="CloseIcon">
				</button>
			</div>

			<!-- General error message (appears after button) -->
			<div v-if="errors.general" class="contact-form__general-error">
				{{ errors.general }}
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useContactForm, useHeaderTranslations, useHeaderDesign } from '../../composables'
import CloseIcon from '../../../../shared/assets/close-icon.svg?raw'

const { state, errors, submitForm, reset, clearFieldError } = useContactForm()
const { translate } = useHeaderTranslations()
const { headerTextColor, headerFontFamily } = useHeaderDesign()

// Form data
const formData = ref({
	name: '',
	email: '',
	phone: '',
	message: '',
})

// Honeypot field for spam protection
const honeypot = ref('')

// Handle form submission
const handleSubmit = async () => {
	// Check honeypot - if filled, it's likely a bot
	if (honeypot.value) {
		return
	}

	const success = await submitForm(formData.value)

	if (success) {
		// Reset form after 13 seconds (gives users time to read the success message)
		setTimeout(() => {
			formData.value = {
				name: '',
				email: '',
				phone: '',
				message: '',
			}
			reset()
		}, 13000)
	}
}

// Manually dismiss success message
const dismissSuccess = () => {
	formData.value = {
		name: '',
		email: '',
		phone: '',
		message: '',
	}
	reset()
}
</script>

<style scoped lang="scss">
@use '../../constants' as c;

.contact-form {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 32px;
	width: 100%;

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

	&__form {
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: 100%;
	}

	&__field {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	&__input,
	&__textarea {
		padding: 12px 16px;
		border: 1px solid rgba(0, 0, 0, 0.15);
		border-radius: 4px;
		font-family: v-bind(headerFontFamily);
		font-size: 14px;
		line-height: 150%;
		color: v-bind(headerTextColor);
		background-color: transparent;
		transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
		width: 100%;

		&::placeholder {
			color: rgba(0, 0, 0, 0.4);
			opacity: 1;
		}

		&:hover:not(:disabled) {
			border-color: rgba(0, 0, 0, 0.3);
		}

		&:focus {
			outline: none;
			border-color: v-bind(headerTextColor);
			box-shadow: 0 0 0 1px v-bind(headerTextColor);
		}

		&:disabled {
			opacity: 0.6;
			cursor: not-allowed;
			background-color: rgba(0, 0, 0, 0.02);
		}

		&--error {
			border-color: v-bind(headerTextColor);

			&:focus {
				border-color: v-bind(headerTextColor);
				box-shadow: 0 0 0 1px v-bind(headerTextColor);
			}
		}
	}

	&__textarea {
		min-height: 120px;
		resize: vertical;
		font-family: inherit;

		&--error {
			border-color: v-bind(headerTextColor);

			&:focus {
				border-color: v-bind(headerTextColor);
				box-shadow: 0 0 0 1px v-bind(headerTextColor);
			}
		}
	}

	&__error {
		color: v-bind(headerTextColor);
		font-family: v-bind(headerFontFamily);
		font-size: 13px;
		line-height: 150%;
		margin-top: -2px;
		opacity: 0.7;
		min-height: 20px;
	}

	&__honeypot {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		opacity: 0;
		pointer-events: none;
	}

	&__submit-button {
		display: flex;
		padding: 12px 48px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		align-self: stretch;
		border: none;
		border-radius: 4px;
		background: v-bind(headerTextColor);
		color: #FFF;
		text-align: center;
		cursor: pointer;
		font-family: v-bind(headerFontFamily);
		font-size: 16px;
		font-weight: 600;
		line-height: 150%;
		letter-spacing: -0.08px;
		transition: opacity 0.2s ease, transform 0.1s ease;

		&:hover:not(:disabled) {
			opacity: 0.8;
		}

		&:active:not(:disabled) {
			opacity: 0.6;
			transform: translateY(1px);
		}

		&:focus-visible {
			outline: 2px solid v-bind(headerTextColor);
			outline-offset: 2px;
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.7;
		}

		&--loading {
			position: relative;

			&::after {
				content: '';
				position: absolute;
				right: 16px;
				width: 16px;
				height: 16px;
				border: 2px solid rgba(255, 255, 255, 0.3);
				border-top-color: #FFF;
				border-radius: 50%;
				animation: spinner 0.8s linear infinite;
			}
		}

		&--success {
			background: v-bind(headerTextColor);
			opacity: 0.8;

			&:focus-visible {
				outline-color: v-bind(headerTextColor);
			}
		}
	}

	&__general-error {
		color: v-bind(headerTextColor);
		font-family: v-bind(headerFontFamily);
		font-size: 14px;
		line-height: 150%;
		padding: 16px;
		background-color: rgba(0, 0, 0, 0.05);
		border: 1px solid v-bind(headerTextColor);
		border-radius: 4px;
		margin-top: 16px;
		word-wrap: break-word;
		overflow-wrap: break-word;
		max-width: 100%;
	}

	&__success {
		position: relative;
		display: flex;
		align-items: flex-start;
		gap: 12px;
		color: v-bind(headerTextColor);
		font-family: v-bind(headerFontFamily);
		font-size: 14px;
		line-height: 150%;
		padding: 16px 40px 16px 16px;
		background-color: rgba(0, 0, 0, 0.03);
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: 4px;
		margin-top: 16px;
		width: 100%;
		box-sizing: border-box;
	}

	&__success-text {
		flex: 1;
		word-wrap: break-word;
		overflow-wrap: break-word;
		word-break: break-word;
		white-space: normal;
		hyphens: auto;
	}

	&__success-close {
		position: absolute;
		top: 8px;
		right: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		padding: 0;
		border: none;
		background: transparent;
		color: v-bind(headerTextColor);
		cursor: pointer;
		border-radius: 4px;
		transition: opacity 0.2s ease;
		flex-shrink: 0;

		:deep(svg) {
			width: 20px;
			height: 20px;

			path {
				fill: v-bind(headerTextColor);
			}
		}

		&:hover {
			opacity: 0.8;
		}

		&:active {
			opacity: 0.6;
		}

		&:focus-visible {
			outline: 2px solid v-bind(headerTextColor);
			outline-offset: 1px;
		}
	}
}

@keyframes spinner {
	to {
		transform: rotate(360deg);
	}
}
</style>
