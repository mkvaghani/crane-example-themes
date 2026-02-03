import { ref, onMounted, onBeforeUnmount, watch, type Ref, type ComputedRef } from 'vue'

// YouTube IFrame API types
interface YTPlayer {
	playVideo: () => void
	pauseVideo: () => void
	getPlayerState: () => number
	destroy: () => void
	loadVideoById: (videoId: string) => void
}

interface YTPlayerConstructor {
	new(elementId: string, options: YTPlayerOptions): YTPlayer
}

interface YTPlayerOptions {
	height: string
	width: string
	videoId: string
	host: string
	playerVars: Record<string, number | string>
	events: {
		onReady?: () => void
		onStateChange?: (event: { data: number }) => void
		onError?: (event: { data: number }) => void
	}
}

interface YTNamespace {
	Player: YTPlayerConstructor
	PlayerState: {
		PLAYING: number
	}
}

interface WindowWithYT extends Window {
	YT?: YTNamespace
	onYouTubeIframeAPIReady?: () => void
	__brandStoryCounter?: number
}

declare const window: WindowWithYT

// Generate unique instance ID
let instanceCounter = 0
function getUniquePlayerId(): string {
	if (typeof window !== 'undefined') {
		if (!window.__brandStoryCounter) {
			window.__brandStoryCounter = 0
		}
		instanceCounter = ++window.__brandStoryCounter
	}
	return `brand-story-youtube-player-${instanceCounter}`
}

export function useYouTubePlayer(videoId: Ref<string> | ComputedRef<string>) {
	const isPlaying = ref(false)
	const hasPlayedOnce = ref(false)
	const player = ref<YTPlayer | null>(null)
	const playerId = getUniquePlayerId()
	const isClient = ref(false)
	const hasError = ref(false)
	const errorMessage = ref('')

	// Load YouTube IFrame API
	function loadYouTubeAPI() {
		// Only run on client
		if (typeof window === 'undefined') return

		// Wait for DOM element to be ready
		const checkAndInit = () => {
			// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded by typeof window check in parent
			const element = document.getElementById(playerId)
			if (!element) {
				setTimeout(checkAndInit, 100)
				return
			}

			// Check if API is already loaded
			if (window.YT && window.YT.Player) {
				initializePlayer()
				return
			}

			// Check if script is already loading
			// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded by typeof window check in parent
			if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
			// Script exists, wait for it to load
				const waitForYT = setInterval(() => {
					if (window.YT && window.YT.Player) {
						clearInterval(waitForYT)
						initializePlayer()
					}
				}, 100)
				return
			}

			// Load the API script
			const originalCallback = window.onYouTubeIframeAPIReady
			window.onYouTubeIframeAPIReady = () => {
				if (originalCallback && typeof originalCallback === 'function') {
					originalCallback()
				}
				initializePlayer()
			}

			// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded by typeof window check in parent
			const tag = document.createElement('script')
			tag.src = 'https://www.youtube.com/iframe_api'
			tag.async = true
			// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded by typeof window check in parent
			const firstScriptTag = document.getElementsByTagName('script')[0]
			firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
		}

		checkAndInit()
	}

	// Initialize YouTube player
	function initializePlayer() {
		if (typeof window === 'undefined') return

		// Check if already initialized
		if (player.value) {
			console.log('[Brand Story] YouTube player already initialized')
			return
		}

		// Get video ID from ref/computed
		const videoIdToUse = videoId.value
		if (!videoIdToUse || videoIdToUse === '') {
			console.warn('[Brand Story] No video ID provided, skipping initialization')
			hasError.value = true
			return
		}

		const YT = window.YT
		if (!YT || !YT.Player) {
			console.error('[Brand Story] YouTube API not loaded')
			return
		}

		// Verify element exists
		// eslint-disable-next-line no-restricted-globals -- SSR-safe: guarded by typeof window check above
		const element = document.getElementById(playerId)
		if (!element) {
			console.error('[Brand Story] Player element not found:', playerId)
			return
		}

		// Reset error state
		hasError.value = false
		errorMessage.value = ''

		console.log('[Brand Story] Initializing YouTube player with video ID:', videoIdToUse)

		try {
			player.value = new YT.Player(playerId, {
				height: '100%',
				width: '100%',
				videoId: videoIdToUse,
				host: 'https://www.youtube.com',
				playerVars: {
					controls: 1, // Show controls
					mute: 1, // Muted by default
					playsinline: 1,
					rel: 0, // Don't show related videos
					modestbranding: 1, // Reduce YouTube branding (logo still visible per YouTube policy)
					fs: 1, // Allow fullscreen
					iv_load_policy: 3, // Hide video annotations
					autoplay: 0, // Don't autoplay
					autohide: 1, // Auto-hide controls after playback starts
					origin: typeof window !== 'undefined' ? window.location.origin : '',
				},
				events: {
					onReady: onPlayerReady,
					onStateChange: onPlayerStateChange,
					onError: onPlayerError,
				},
			})
		} catch (error) {
			console.error('[Brand Story] Error initializing YouTube player:', error)
			hasError.value = true
			errorMessage.value = 'Failed to load video player'
		}
	}

	// Update video when videoId changes
	function updateVideo(newVideoId: string) {
		if (typeof window === 'undefined') return

		// If new video ID is empty, set error and don't try to update
		if (!newVideoId || newVideoId === '') {
			console.warn('[Brand Story] Empty video ID, hiding player')
			hasError.value = true
			errorMessage.value = 'No video ID provided'
			hasPlayedOnce.value = false
			isPlaying.value = false
			return
		}

		if (!player.value) {
			console.warn('[Brand Story] Cannot update video: player not initialized')
			return
		}

		if (!player.value.loadVideoById) {
			console.warn('[Brand Story] Cannot update video: loadVideoById method not available')
			return
		}

		console.log('[Brand Story] Updating video to:', newVideoId)

		// Reset states
		hasError.value = false
		errorMessage.value = ''
		hasPlayedOnce.value = false
		isPlaying.value = false

		try {
			player.value.loadVideoById(newVideoId)
			console.log('[Brand Story] Video updated successfully')
		} catch (error) {
			console.error('[Brand Story] Error updating video:', error)
			hasError.value = true
			errorMessage.value = 'Failed to load video'
		}
	}

	// Player ready callback
	function onPlayerReady() {
		console.log('[Brand Story] YouTube player ready')
		// Player is ready - clear any errors
		hasError.value = false
		errorMessage.value = ''
	}

	// Player state change callback
	function onPlayerStateChange(event: { data: number }) {
		if (typeof window === 'undefined') return

		const YT = window.YT
		if (!YT) return

		// YouTube player states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (cued)
		isPlaying.value = event.data === YT.PlayerState.PLAYING

		// If video starts playing and hasn't played before, show controls
		if (event.data === YT.PlayerState.PLAYING && !hasPlayedOnce.value) {
			hasPlayedOnce.value = true
			// Controls are already enabled, just update state to show them via CSS
		}

		// When video ends (state = 0), make play button active again
		if (event.data === 0) {
			hasPlayedOnce.value = false
			isPlaying.value = false
		}
	}

	// Player error callback
	function onPlayerError(event: { data: number }) {
		hasError.value = true

		// YouTube error codes
		switch (event.data) {
			case 2:
				errorMessage.value = 'Invalid video ID'
				console.error('[Brand Story] YouTube Error (Code 2): Invalid video parameter or ID')
				break
			case 5:
				errorMessage.value = 'HTML5 player error'
				console.error('[Brand Story] YouTube Error (Code 5): HTML5 player error')
				break
			case 100:
				errorMessage.value = 'Video not found or private'
				console.error('[Brand Story] YouTube Error (Code 100): Video not found, deleted, or marked as private')
				break
			case 101:
			case 150:
				errorMessage.value = 'Video embedding not allowed'
				console.error('[Brand Story] YouTube Error (Code 101/150): The owner of the video does not allow embedding')
				break
			default:
				errorMessage.value = 'Failed to load video'
				console.error('[Brand Story] YouTube Error (Code ' + event.data + '): Unknown error')
		}

		console.error('[Brand Story] Video will be hidden due to error')
	}

	// Toggle play/pause
	function togglePlay() {
		if (!player.value || !player.value.getPlayerState) return
		if (typeof window === 'undefined') return

		const YT = window.YT
		if (!YT) return

		try {
			const state = player.value.getPlayerState()

			if (state === YT.PlayerState.PLAYING) {
				player.value.pauseVideo()
			} else {
				player.value.playVideo()
				// Note: hasPlayedOnce will be set in onPlayerStateChange when video actually starts
			}
		} catch (error) {
			console.error('Error toggling video:', error)
		}
	}

	// Lifecycle hooks
	onMounted(() => {
		isClient.value = true
		loadYouTubeAPI()
	})

	onBeforeUnmount(() => {
		if (player.value && player.value.destroy) {
			try {
				player.value.destroy()
			} catch (error) {
				console.error('Error destroying player:', error)
			}
		}
	})

	// Watch for video ID changes
	watch(videoId, (newVideoId, oldVideoId) => {
		console.log('[Brand Story] Video ID changed:', { old: oldVideoId, new: newVideoId })

		// Only update if video ID actually changed and player is initialized
		if (newVideoId !== oldVideoId && player.value) {
			console.log('[Brand Story] Triggering video update...')
			updateVideo(newVideoId)
		} else if (!player.value) {
			console.log('[Brand Story] Player not yet initialized, video will load on init')
		}
	}, { flush: 'post' })

	return {
		playerId,
		isPlaying,
		hasPlayedOnce,
		isClient,
		togglePlay,
		hasError,
		errorMessage,
	}
}
