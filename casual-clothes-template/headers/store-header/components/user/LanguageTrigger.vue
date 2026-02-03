<template>
	<span class="language-trigger" :class="{ 'language-trigger--standalone': showArrow }">
		<span>{{ displayCode }}</span>
		<span v-if="showArrow" class="language-trigger__arrow" v-html="DropdownArrowIcon"></span>
	</span>
</template>

<script setup lang="ts">
import DropdownArrowIcon from '../../assets/dropdown-arrow.svg?raw'
import { useHeaderDesign } from '../../composables'

defineProps<{
	displayCode: string
	showArrow?: boolean
}>()

const { headerTextColor } = useHeaderDesign()
</script>

<style scoped lang="scss">
.language-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &--standalone {
    padding: 4px 8px;
    border-radius: 4px;
    transition: opacity 0.2s ease;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      opacity: 0.6;
    }
  }
}

.language-trigger__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  height: 6px;

  :deep(svg) {
    width: 100%;
    height: 100%;
    color: v-bind(headerTextColor);
  }
}
</style>
