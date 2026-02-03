<template>
	<section class="hero-banner">
		<BannerBackground />
		<BannerContent />
	</section>
</template>

<script setup lang="ts">
import BannerContent from './components/BannerContent.vue'
import BannerBackground from './components/BannerBackground.vue'
</script>

<style scoped>
.hero-banner {
	position: relative;
	width: 100%;
	min-height: 500px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 16px;
	overflow: hidden;

  @media (min-width: 768px) {
      min-height: 600px;
      padding: 16px;
  }
}
</style>
