<template>
	<div>
		<slot :name="Slot.PRODUCT_LIST" />
		<slot :name="Slot.CUSTOM_SLOT" slot-id="custom-bottom-bar" />
	</div>
</template>

<script setup lang="ts">
import { CatalogLayoutSlot as Slot } from '@lightspeed/crane'
</script>
