<template>
	<div class="products-grid">
		<div class="products-grid__small-group">
			<ProductCard :product="product1" />
			<ProductCard :product="product2" />
		</div>
		<ProductCard :product="product3" />
	</div>
</template>

<script setup lang="ts">

import ProductCard from './ProductCard.vue'
import { computed } from 'vue'
import { ProductView } from '../../../shared/types/product.ts'

const props = defineProps<{
  products: ProductView[]
}>()

// Transform products from API
const product1 = computed(() => props.products[0])
const product2 = computed(() => props.products[1])
const product3 = computed(() => props.products[2])
</script>

<style scoped lang="scss">
.products-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;

  /* Small cards group - 2 columns on mobile */
  &__small-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  /* Desktop: [Card1 Card2] | [Featured] */
  @media (min-width: 768px) {
    /* Desktop: 2 columns (left group | featured) */
      display: grid;
      grid-template-columns: 1fr 1fr;
  }
}
</style>
