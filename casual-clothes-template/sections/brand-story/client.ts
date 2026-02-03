import { createVueClientApp } from '@lightspeed/crane'
import { Content, Design } from './type.ts'
import BrandStory from './BrandStory.vue'

export default createVueClientApp<Content, Design>(BrandStory)
