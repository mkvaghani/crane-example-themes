<template>
	<SectionWrapper :style="sectionBackgroundStyle">
		<div class="brand-story">
			<div v-if="!hasError" class="brand-story__hero-container">
				<VideoPlayer :video-url="videoUrl" />
				<PlayButton :video-url="videoUrl" />
			</div>

			<StoryContent />
		</div>
	</SectionWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
	useInputboxElementContent,
	useBackgroundElementDesign,
} from '@lightspeed/crane'
import { Content, Design } from './type'
import SectionWrapper from '../../shared/components/SectionWrapper.vue'
import { useYouTubePlayer } from './composables/use-youtube-player.ts'
import { useBackgroundStyle } from '../../shared/composables'
import { extractYouTubeId } from './utils/utils.ts'
import PlayButton from './components/PlayButton.vue'
import StoryContent from './components/StoryContent.vue'
import VideoPlayer from './components/VideoPlayer.vue'

// Content
const videoUrlRaw = useInputboxElementContent<Content>('video_url')

// Design
const sectionBackgroundDesign = useBackgroundElementDesign<Design>('section_background') as BackgroundDesignData

const videoUrl = computed(() => extractYouTubeId(videoUrlRaw.value))

// YouTube player (client-only)
const { hasError } = useYouTubePlayer(videoUrl)

// Background style using shared composable
const sectionBackgroundStyle = useBackgroundStyle(sectionBackgroundDesign)

</script>
<style scoped lang="scss">
.brand-story {
	width: 100%;
	height: 100%;
	padding: 32px 8px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 16px;

  @media (min-width: 768px) {
    padding: 48px 16px;
    gap: 32px;
  }

  &__hero-container {
    align-self: stretch;
    position: relative;
    width: 100%;
    height: 304px;
    background: #000;

    @media (min-width: 768px) {
      height: 696px;
    }
  }
}
</style>
