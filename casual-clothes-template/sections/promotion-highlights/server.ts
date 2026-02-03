import { createVueServerApp } from '@lightspeed/crane'
import { Content, Design } from './type.ts'
import PromotionHighlights from './PromotionHighlights.vue'

export default createVueServerApp<Content, Design>(PromotionHighlights)
