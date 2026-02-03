<template>
	<div v-if="hasBottomRowContent" class="header-bottom-row">
		<div class="header-bottom-row__left">
			<Categories
				v-if="categoriesShow.enabled"
				:active-category="activeCategory"
				@open-catalog="$emit('open-catalog', $event)"
				@close-catalog="$emit('close-catalog')"
			/>
		</div>
		<div class="header-bottom-row__right">
			<Search v-if="searchShow.enabled" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Categories from '../navigation/Categories.vue'
import Search from '../user/Search.vue'
import type { ActiveCategoryProps, OpenCatalogEmits } from '../../types/common'
import { useHeaderToggles } from '../../composables'

defineProps<ActiveCategoryProps>()
defineEmits<OpenCatalogEmits & { (e: 'close-catalog'): void }>()

const { searchShow, categoriesShow } = useHeaderToggles()

const hasBottomRowContent = computed(() => {
	return searchShow.enabled || categoriesShow.enabled
})
</script>

<style scoped lang="scss">
.header-bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  /* Inherit background from parent header */
  gap: 1rem;
  min-height: 40px;
}

.header-bottom-row__left {
  display: flex;
  align-items: center;
  flex: 1;
}

.header-bottom-row__right {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
</style>
