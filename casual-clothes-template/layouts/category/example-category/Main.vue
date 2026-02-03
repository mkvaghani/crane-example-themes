<template>
	<div>
		<slot :name="Slot.CATEGORY_TITLE" />
		<slot :name="Slot.PRODUCT_LIST" />
		<slot :name="Slot.BOTTOM_BAR" />
	</div>
</template>

<script setup lang="ts">
import { CategoryLayoutSlot as Slot } from '@lightspeed/crane'
</script>
