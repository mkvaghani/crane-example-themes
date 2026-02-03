<template>
	<div class="loading-skeleton">
		<div class="loading-skeleton__small-group">
			<div class="loading-skeleton__card">
				<Skeleton variant="image" height="280px" />
				<Skeleton variant="text" width="60%" class="loading-skeleton__name" />
				<Skeleton variant="text" width="40%" class="loading-skeleton__price" />
			</div>
			<div class="loading-skeleton__card">
				<Skeleton variant="image" height="280px" />
				<Skeleton variant="text" width="60%" class="loading-skeleton__name" />
				<Skeleton variant="text" width="40%" class="loading-skeleton__price" />
			</div>
		</div>
		<div class="loading-skeleton__featured">
			<Skeleton variant="image" height="100%" />
		</div>
	</div>
</template>
<script setup lang="ts">
import Skeleton from '../../../shared/components/Skeleton.vue'
</script>

<style scoped lang="scss">
.loading-skeleton {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 300px;

  &__small-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__name {
    margin-top: 12px;
  }

  &__price {
    height: 24px;
  }

  &__featured {
    min-height: 400px;
  }
}

@media (min-width: 768px) {
  .loading-skeleton {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    &__small-group {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    &__featured {
      min-height: 100%;
    }
  }
}
</style>
