<template>
	<div :class="{ 'product-details--top-title-navigation': isProductNameAlwaysFirstOnMobile }">
		<slot :name="Slot.TOP_BAR" />
		<div
			:class="availableProductClasses"
			itemtype="http://schema.org/Product"
			:itemscope="showProductDetailsProductPrice"
		>
			<slot :name="Slot.GALLERY" />
			<slot :name="Slot.SIDEBAR" />
			<slot :name="Slot.DESCRIPTION" />
			<div class="clearboth" />
		</div>
		<slot :name="Slot.REVIEW_LIST" />
		<slot :name="Slot.RELATED_PRODUCTS" />
		<slot :name="Slot.BOTTOM_BAR" />
	</div>
</template>

<script setup lang="ts">
import { HTMLAttributes } from 'vue'
import { ProductLayoutSlot as Slot } from '@lightspeed/crane'

interface Props {
  availableProductClasses?: HTMLAttributes['class'],
  showProductDetailsProductPrice?: boolean,
  isProductNameAlwaysFirstOnMobile?: boolean,
}

withDefaults(defineProps<Props>(), {
	isProductNameAlwaysFirstOnMobile: false,
	availableProductClasses: '',
	showProductDetailsProductPrice: true,
})
</script>
