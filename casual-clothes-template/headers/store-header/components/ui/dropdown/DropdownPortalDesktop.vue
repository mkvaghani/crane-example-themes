<template>
	<div
		@mouseenter="handleHoverTrigger"
		@mouseleave="handleUnHoverTrigger">
		<div ref="triggerRef" >
			<slot
				name="trigger"
			/>
		</div>

		<Teleport to="#portal-target" v-if="isMounted">
			<div
				v-show="isDropdownOpen"
				class="bridge"
				:style="{
					top: bridgeStyle?.top,
					'height':  `${somePadding}px`,
					width: '100%'
				}"
				@mouseenter="handleHoverBridge"
				@mouseleave="handleUnHoverBridge"
			/>
			<div
				v-show="isDropdownOpen"
				class="teleported"
				:style="{
					top: contentStyle?.top,
				}"
				@mouseenter="handleHoverContent"
				@mouseleave="handleUnHoverContent"
			>
				<slot name="content" />
			</div>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
import { ref, shallowRef, nextTick, watch } from 'vue'
import { useMounted, useDebounceFn, useWindowScroll } from '@vueuse/core'
import { useEscapeKey } from '../../../../../shared/composables'

const isMounted = useMounted()

const somePadding = 5

interface ContentCoordinates {
  top: `${number}px`
}

const isDropdownOpen = defineModel<boolean>({ default: false })

const triggerRef = ref<HTMLElement | null>(null)

const isHoveringTrigger = ref(false)
const isHoveringContent = ref(false)
const isHoveringBridge = ref(false)

const handleHoverTrigger = () => isHoveringTrigger.value = true
const handleUnHoverTrigger = () => isHoveringTrigger.value = false
const handleHoverBridge = () => isHoveringBridge.value = true
const handleUnHoverBridge = () => isHoveringBridge.value = false
const handleHoverContent = () => isHoveringContent.value = true
const handleUnHoverContent = () => isHoveringContent.value = false

const contentStyle = shallowRef<ContentCoordinates | null>(null)
const bridgeStyle = shallowRef<ContentCoordinates | null>(null)
const scrollY = shallowRef<number>(0)
const computeCoords = () => {
	console.log('computing')
	const trigger = triggerRef.value
	if (!trigger) return

	nextTick(() => {
		const rect = trigger.getBoundingClientRect()
		bridgeStyle.value = { top: `${scrollY.value + rect.bottom}px` }
		contentStyle.value = { top: `${scrollY.value + rect.bottom + somePadding}px` }
	})
}

const { y } = useWindowScroll()

watch(y, (val) => {
	scrollY.value = val
}, { immediate: true })

const closeDropdownDebounced = useDebounceFn(() => {
	if (!isHoveringTrigger.value && !isHoveringContent.value && !isHoveringBridge.value) {
		isDropdownOpen.value = false
	}
}, 30)

const openDropdownDebounced = useDebounceFn(() => {
	if (!isDropdownOpen.value && (isHoveringTrigger.value || isHoveringContent.value || isHoveringBridge.value)) {
		isDropdownOpen.value = true
		computeCoords()
	}
}, 50)

watch([isHoveringTrigger, isHoveringContent, isHoveringBridge], () => {
	openDropdownDebounced()
	closeDropdownDebounced()
})

useEscapeKey(()=> {isDropdownOpen.value = false})
</script>

<style scoped lang="scss">
.teleported{
  position: absolute;
  width: 100%;
}
.bridge{
  position: absolute;
  width: 100%;
}
</style>
