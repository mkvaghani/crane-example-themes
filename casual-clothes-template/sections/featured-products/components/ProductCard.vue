<template>
	<div class="product-card">
		<a
			:href="linkHref"
			class="product-card__image"
			@click="handleProductClick"
		>
			<img
				v-if="hasValidProductImage"
				:src="imageUrl"
				:alt="name"
			/>
			<Badge
				v-if="ribbon"
				:text="ribbon.text"
				:color="ribbon.color"
				position="top-left"
				class="product-card__badge"
			/>
			<div class="product-card__icon">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M12 5V19M5 12H19"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"/>
				</svg>
			</div>
		</a>
		<h3 :style="productNameStyle" class="product-card__name">{{ name }}</h3>
		<div class="product-card__prices_container">
			<p
				:style="productPriceStyle"
				class="product-card__price">
				{{ price }}
			</p>
			<span
				v-if="salePrice"
				:style="productSalePriceStyle"
				class="product-card__price--sale">
				{{ salePrice }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">

import Badge from '../../../shared/components/Badge.vue'
import { usePreviewMode } from '../../../shared/composables'
import { computed } from 'vue'
import { addLanguagePrefix, createTextStyle, hasValidImage } from '../../../shared/utils'
import { useTextElementDesign } from '@lightspeed/crane'
import type { Design } from '../type.ts'
import type { ProductView } from '../../../shared/types/product.ts'

const props = defineProps<{ product: ProductView }>()

const linkHref = computed(() => addLanguagePrefix(props.product.url))
const imageUrl = computed(() => props.product.imageUrl)
const name = computed(() => props.product.name || '')
const price = computed(() => props.product.defaultDisplayedPriceFormatted || '')
const salePrice = computed(() => props.product.compareToPriceFormatted)
const ribbon = computed(() => props.product.ribbon)

const hasValidProductImage = computed(() => hasValidImage(imageUrl.value))

// Preview mode detection - block navigation in preview
const { isPreviewMode } = usePreviewMode()

const productNameDesign = useTextElementDesign<Design>('product_name') as TextDesignData
const productPriceDesign = useTextElementDesign<Design>('product_price') as TextDesignData
const productSalePriceDesign = useTextElementDesign<Design>('product_sale_price') as TextDesignData

// Text styles using shared utility
const productNameStyle = computed(() => createTextStyle(productNameDesign, { defaultSize: 16 }))
const productPriceStyle = computed(() => createTextStyle(productPriceDesign, { defaultSize: 32 }))
const productSalePriceStyle = computed(() => createTextStyle(productSalePriceDesign, { defaultSize: 32 }))

/**
 * Handle product link click - block navigation in preview mode
 */
const handleProductClick = (event: MouseEvent) => {
	if (isPreviewMode.value) {
		event.preventDefault()
	}
}
</script>

<style scoped lang="scss">
/* Product Card */
.product-card {
  display: flex;
  flex-direction: column;
  gap: 16px;

  /* Product Image */
  &__image {
    position: relative;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    background: #f0f0f0;
    display: block;
    text-decoration: none;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  /* Plus Icon */
  &__icon {
    position: absolute;
    bottom: 8px;
    right: 8px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.64);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;

    & svg {
      width: 16px;
      height: 16px;
    }
  }

  &__prices_container {
    display: flex;
    align-items: center;
  }

  /* Badge */
  &__badge {
    position: absolute;
    top: 0;
    left: 0;
    padding: 4px 8px;
    background: #000;
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: -0.06px;
  }

  /* Product Info */
  &__name,
  &__price {
    line-height: 1.5;
    letter-spacing: -0.08px;
  }

  &__price--sale {
    text-decoration: line-through;
    margin-left: 5px;
  }
}
</style>
