import { createVueServerApp } from '@lightspeed/crane'
import { Content, Design } from './type.ts'
import BrandStory from './BrandStory.vue'

export default createVueServerApp<Content, Design>(BrandStory)
