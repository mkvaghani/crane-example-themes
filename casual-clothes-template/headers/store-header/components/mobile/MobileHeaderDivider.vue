<template>
	<div class="mobile-header-divider"></div>
</template>

<script setup lang="ts">
import { useHeaderDesign } from '../../composables'

const { headerTextColor } = useHeaderDesign()
</script>

<style scoped lang="scss">
.mobile-header-divider {
  height: 1px;
  background: v-bind(headerTextColor);
  opacity: 0.16;
  margin: 0;
}
</style>
