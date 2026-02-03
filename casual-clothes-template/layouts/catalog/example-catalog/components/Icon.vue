<template>
	<div class="icon" :class="iconClass">
		<img :src="accountIcon" alt="account icon" />
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import accountIcon from '../assets/account-icon.svg'

interface Props {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
	size: 'medium',
	color: 'currentColor',
})

const iconClass = computed(() => ({
	[`icon--${props.size}`]: true,
}))
</script>

<style lang="scss" scoped>
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: v-bind(color);
    transition: all 0.3s ease;
  }

  &--small svg {
    width: 16px;
    height: 16px;
  }

  &--medium svg {
    width: 24px;
    height: 24px;
  }

  &--large svg {
    width: 32px;
    height: 32px;
  }
}
</style>
