import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue'

// Constants for scroll detection and timing
const SCROLL_THRESHOLD = 1 // Pixel threshold for detecting start/end position (accounts for rounding)
const OVERFLOW_THRESHOLD = 1 // Pixel threshold for detecting if content overflows container
const RESIZE_DEBOUNCE_MS = 150 // Debounce delay for window resize events

interface CarouselOptions {
    /**
     * Total number of items in the carousel
     */
    totalItems: Ref<number>

    /**
     * Item width in pixels for mobile
     */
    itemWidthMobile?: number

    /**
     * Item width in pixels for desktop
     */
    itemWidthDesktop?: number

    /**
     * Gap between items in pixels
     */
    gap?: number

    /**
     * Breakpoint for desktop in pixels
     */
    breakpoint?: number

    /**
     * Scroll behavior - 'smooth' or 'auto'
     */
    scrollBehavior?: ScrollBehavior

    /**
     * Enable scroll snap centering on mobile
     */
    centerOnMobile?: boolean

    /**
     * Enable infinite loop - carousel wraps around
     */
    isInfinite?: boolean
}

const DEFAULT_OPTIONS = {
	itemWidthMobile: 216,
	itemWidthDesktop: 340,
	gap: 16,
	breakpoint: 768,
	scrollBehavior: 'smooth' as ScrollBehavior,
	centerOnMobile: true,
	isInfinite: false,
}

export function useCarousel(
	carouselRef: Ref<HTMLElement | null>,
	options: CarouselOptions,
) {
	const opts = { ...DEFAULT_OPTIONS, ...options }

	const currentIndex = ref(0)
	// eslint-disable-next-line no-restricted-globals -- SSR-safe: fallback to true for mobile-first
	const isMobile = ref(typeof window !== 'undefined' ? window.innerWidth < opts.breakpoint : true)
	const hasOverflow = ref(false)

	// Computed item width and scroll amount based on screen size
	const itemWidth = computed(() =>
		isMobile.value ? opts.itemWidthMobile : opts.itemWidthDesktop,
	)

	const scrollAmount = computed(() => itemWidth.value + opts.gap)

	// Check if carousel has scrollable content
	const checkOverflow = () => {
		if (!carouselRef.value) return

		const { scrollWidth, clientWidth } = carouselRef.value
		hasOverflow.value = scrollWidth > clientWidth + OVERFLOW_THRESHOLD
	}

	// Check if at the end of carousel
	const isAtEnd = () => {
		if (!carouselRef.value) return false

		const { scrollLeft, scrollWidth, clientWidth } = carouselRef.value

		return scrollLeft + clientWidth >= scrollWidth - SCROLL_THRESHOLD
	}

	// Check if at the start of carousel
	const isAtStart = () => {
		if (!carouselRef.value) return false

		return carouselRef.value.scrollLeft <= SCROLL_THRESHOLD
	}

	// Update button states based on scroll position
	const updateButtonStates = () => {
		if (!carouselRef.value) return

		const scrollLeft = carouselRef.value.scrollLeft

		// Calculate current index based on scroll position
		currentIndex.value = Math.round(scrollLeft / scrollAmount.value)

		// Ensure index stays within bounds
		if (currentIndex.value < 0) currentIndex.value = 0
		if (currentIndex.value >= options.totalItems.value) {
			currentIndex.value = options.totalItems.value - 1
		}

		// Check overflow after scroll
		checkOverflow()
		updatePrevNextButtonsState()
	}

	const prevDisabled = ref(false)
	const nextDisabled = ref(false)

	function updatePrevNextButtonsState() {
		if (!hasOverflow.value) {
			prevDisabled.value = true
			nextDisabled.value = true
			return
		}

		if (opts.isInfinite) {
			prevDisabled.value = false
			nextDisabled.value = false
			return
		}

		prevDisabled.value = isAtStart()
		nextDisabled.value = isAtEnd()
	}

	// Computed: should show navigation controls
	const shouldShowControls = computed(() => hasOverflow.value)

	// Scroll to a specific index
	const scrollToIndex = (index: number) => {
		if (!carouselRef.value) return

		const targetScroll = index * scrollAmount.value

		carouselRef.value.scrollTo({
			left: targetScroll,
			behavior: opts.scrollBehavior,
		})

		currentIndex.value = index
		updatePrevNextButtonsState()
	}

	// Scroll the carousel by direction
	const scrollCarousel = (direction: 'prev' | 'next') => {
		if (!carouselRef.value || !hasOverflow.value) return

		const currentScrollLeft = carouselRef.value.scrollLeft
		let newIndex = currentIndex.value
		const lastIndex = options.totalItems.value - 1

		if (direction === 'prev') {
			const prevIndex  = currentIndex.value - 1

			// Fix scroll position only if we're near the start (index 0-1) but not exactly at scroll position 0
			// This handles the edge case where user manually scrolls slightly from the first item
			if (currentIndex.value <= 1 && !isAtStart() && currentScrollLeft > 0) {
				newIndex = 0
			}
			else if ((isAtStart() && opts.isInfinite) || (prevIndex < 0 && opts.isInfinite)){
				newIndex = lastIndex
			}
			else {
				newIndex = Math.max(0, prevIndex)
			}
		} else if (direction === 'next') {
			const nextIndex = currentIndex.value + 1

			if ((isAtEnd() && opts.isInfinite) || (nextIndex > lastIndex && opts.isInfinite)) {
				newIndex = 0
			} else {
				newIndex = Math.min(lastIndex, nextIndex)
			}
		}

		// Only scroll if index changed OR if we need to correct scroll position
		if (newIndex !== currentIndex.value || (direction === 'prev' && currentScrollLeft > SCROLL_THRESHOLD)) {
			scrollToIndex(newIndex)
		}
	}

	// Debounced resize handler
	let resizeTimeout: ReturnType<typeof setTimeout> | null = null
	
	const handleResize = () => {
		if (resizeTimeout) {
			clearTimeout(resizeTimeout)
		}

		resizeTimeout = setTimeout(() => {
			const wasMobile = isMobile.value
			// eslint-disable-next-line no-restricted-globals -- SSR-safe: called from resize handler (client-only)
			isMobile.value = window.innerWidth < opts.breakpoint

			checkOverflow()
			updatePrevNextButtonsState()

			// If switching between mobile/desktop, scroll to current index to adjust position
			if (wasMobile !== isMobile.value && carouselRef.value) {
				scrollToIndex(currentIndex.value)
			}
			
			resizeTimeout = null
		}, RESIZE_DEBOUNCE_MS)
	}

	// Keyboard navigation handler
	const handleKeyDown = (event: KeyboardEvent) => {
		// Only handle arrow keys when carousel has focus or focus is within carousel
		if (!carouselRef.value) return
		
		// eslint-disable-next-line no-restricted-globals -- SSR-safe: called from keydown handler (client-only)
		const isCarouselFocused = carouselRef.value.contains(document.activeElement)
		if (!isCarouselFocused) return

		if (event.key === 'ArrowLeft') {
			event.preventDefault()
			scrollCarousel('prev')
		} else if (event.key === 'ArrowRight') {
			event.preventDefault()
			scrollCarousel('next')
		}
	}

	// Initialize
	onMounted(() => {
		if (!carouselRef.value) return

		// Use ResizeObserver for reliable initial detection
		const resizeObserver = new ResizeObserver(() => {
			checkOverflow()
			updateButtonStates()
			updatePrevNextButtonsState()
		})

		resizeObserver.observe(carouselRef.value)

		// Event listeners
		carouselRef.value.addEventListener('scroll', updateButtonStates)
		// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside onMounted
		window.addEventListener('resize', handleResize)
		// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside onMounted
		document.addEventListener('keydown', handleKeyDown)

		// Make carousel focusable for keyboard navigation
		if (!carouselRef.value.hasAttribute('tabindex')) {
			carouselRef.value.setAttribute('tabindex', '0')
		}

		// Cleanup
		onUnmounted(() => {
			resizeObserver.disconnect()

			if (resizeTimeout) {
				clearTimeout(resizeTimeout)
			}

			if (carouselRef.value) {
				carouselRef.value.removeEventListener('scroll', updateButtonStates)
			}

			// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside onUnmounted
			window.removeEventListener('resize', handleResize)
			// eslint-disable-next-line no-restricted-globals -- SSR-safe: inside onUnmounted
			document.removeEventListener('keydown', handleKeyDown)
		})
	})

	return {
		currentIndex,
		prevDisabled,
		nextDisabled,
		shouldShowControls,
		hasOverflow,
		scrollCarousel,
		scrollToIndex,
		centerOnMobile: opts.centerOnMobile,
		isInfinite: opts.isInfinite,
	}
}
