<template>
	<button
		v-if="isClient && !hasPlayedOnce"
		class="brand-story__play-button"
		:style="playButtonStyle"
		@click="togglePlay">
		<div class="brand-story__play-text">
			<span class="brand-story__play-text--mobile">{{ mobilePlayText }}</span>
			<span class="brand-story__play-text--desktop">{{ desktopPlayText }}</span>
		</div>
		<div class="brand-story__play-icon" v-html="isPlaying ? PauseIcon : PlayIcon" />
	</button>
</template>

<script setup lang="ts">
import PlayIcon from '../assets/play-icon.svg?raw'
import PauseIcon from '../assets/pause-icon.svg?raw'
import { useYouTubePlayer } from '../composables/use-youtube-player.ts'
import { computed, ref } from 'vue'
import { useButtonElementDesign, useInputboxElementContent } from '@lightspeed/crane'
import { Content, Design } from '../type.ts'
import { useButtonStyles } from '../../../shared/composables'

const props = defineProps<{
	videoUrl: string
}>()

// YouTube player (client-only)
const { isPlaying, hasPlayedOnce, isClient, togglePlay } = useYouTubePlayer(ref(props.videoUrl))

const playButtonText = useInputboxElementContent<Content>('play_button_text')
const pauseButtonText = useInputboxElementContent<Content>('pause_button_text')
const watchVideoText = useInputboxElementContent<Content>('watch_video_text')

const playButtonDesign = useButtonElementDesign<Design>('play_button')
// Use shared button styling composable
const playButtonStyle = useButtonStyles(playButtonDesign)
// Button text from content
const mobilePlayText = computed(() => isPlaying.value ? pauseButtonText.value : watchVideoText.value)
const desktopPlayText = computed(() => isPlaying.value ? pauseButtonText.value : playButtonText.value)
</script>

<style scoped lang="scss">
.brand-story__play {
  &-button {
    position: absolute;
    bottom: 16px;
    left: 16px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    z-index: 2;

    @media (min-width: 768px) {
      bottom: 32px;
      left: 32px;
    }
  }

  &-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    word-wrap: break-word;

    &--mobile {
      @media (min-width: 768px) {
        display: none;
      }
    }

    &--desktop {
      @media (max-width: 767px) {
        display: none;
      }
    }
  }

  &-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-icon svg {
    display: block;
  }
}
</style>
