<template>
	<div
		class="skeleton"
		:class="skeletonClasses"
		:style="skeletonStyle"
		role="status"
		aria-label="Loading..."
	>
		<span class="skeleton__sr-only">Loading...</span>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Skeleton loading placeholder component
 *
 * Displays an animated placeholder while content is loading.
 * Supports different variants for various content types.
 *
 * @example
 * ```vue
 * <!-- Text skeleton -->
 * <Skeleton variant="text" width="200px" />
 *
 * <!-- Image skeleton -->
 * <Skeleton variant="image" width="300px" height="200px" />
 *
 * <!-- Card skeleton -->
 * <Skeleton variant="card" />
 *
 * <!-- Circle avatar -->
 * <Skeleton variant="circle" width="48px" height="48px" />
 * ```
 */

type SkeletonVariant = 'text' | 'image' | 'card' | 'circle' | 'rectangle'

interface Props {
	/** Skeleton variant type */
	variant?: SkeletonVariant
	/** Custom width (CSS value) */
	width?: string
	/** Custom height (CSS value) */
	height?: string
	/** Border radius (CSS value) */
	borderRadius?: string
	/** Animation type */
	animation?: 'pulse' | 'wave' | 'none'
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'text',
	animation: 'pulse',
})

// Compute CSS classes
const skeletonClasses = computed(() => ({
	[`skeleton--${props.variant}`]: true,
	[`skeleton--${props.animation}`]: props.animation !== 'none',
}))

// Compute inline styles
const skeletonStyle = computed(() => {
	const styles: Record<string, string> = {}

	if (props.width) {
		styles.width = props.width
	}

	if (props.height) {
		styles.height = props.height
	}

	if (props.borderRadius) {
		styles.borderRadius = props.borderRadius
	}

	return styles
})
</script>

<style scoped lang="scss">
.skeleton {
	background-color: #e0e0e0;
	position: relative;
	overflow: hidden;

	// Screen reader only text
	&__sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	// Variants
	&--text {
		height: 1em;
		width: 100%;
		border-radius: 4px;
	}

	&--image {
		width: 100%;
		height: 200px;
		border-radius: 8px;
	}

	&--card {
		width: 100%;
		height: 300px;
		border-radius: 8px;
	}

	&--circle {
		width: 48px;
		height: 48px;
		border-radius: 50%;
	}

	&--rectangle {
		width: 100%;
		height: 100px;
		border-radius: 4px;
	}

	// Pulse animation
	&--pulse {
		animation: skeleton-pulse 1.5s ease-in-out infinite;
	}

	// Wave animation
	&--wave {
		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: linear-gradient(
				90deg,
				transparent,
				rgba(255, 255, 255, 0.4),
				transparent
			);
			animation: skeleton-wave 1.5s ease-in-out infinite;
		}
	}
}

@keyframes skeleton-pulse {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
	}
}

@keyframes skeleton-wave {
	0% {
		transform: translateX(-100%);
	}
	100% {
		transform: translateX(100%);
	}
}
</style>
