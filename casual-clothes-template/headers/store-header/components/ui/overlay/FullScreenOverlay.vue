<template>
	<Teleport to="body" :disabled="!isOpen">
		<div v-if="isOpen" class="fullscreen-overlay" @click="$emit('close')">
			<div
				class="fullscreen-overlay__content"
				:style="{ backgroundColor, color: textColor }"
				@click.stop
			>
				<slot />
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  isOpen: boolean;
  backgroundColor?: string;
  textColor?: string;
}>()

const { backgroundColor, textColor } = props

const emit = defineEmits<{ (e: 'close'): void }>()

const handleKeydown = (e: KeyboardEvent) => {
	if (e.key === 'Escape' && props.isOpen) {
		emit('close')
	}
}

// Lock body scroll when overlay is open
watch(
	() => props.isOpen,
	(isOpen) => {
		// SSR guard: document is not available on server
		// eslint-disable-next-line no-restricted-globals -- SSR-safe: typeof check
		if (typeof document === 'undefined') return

		if (isOpen) {
			// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded above
			document.body.style.overflow = 'hidden'
		} else {
			// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded above
			document.body.style.overflow = ''
		}
	},
)

onMounted(() => {
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside onMounted
	document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside onUnmounted
	document.removeEventListener('keydown', handleKeydown)
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside onUnmounted
	document.body.style.overflow = ''
})
</script>

<style scoped lang="scss">
.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.fullscreen-overlay__content {
  width: 100%;
  height: 100vh;
  /* Default background, can be overridden by inline styles */
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
  overflow-y: auto;
  gap: 32px;
}
</style>
