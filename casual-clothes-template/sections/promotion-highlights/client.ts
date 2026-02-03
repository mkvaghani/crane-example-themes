import { createVueClientApp } from '@lightspeed/crane'
import { Content, Design } from './type.ts'
import PromotionHighlights from './PromotionHighlights.vue'

export default createVueClientApp<Content, Design>(PromotionHighlights)
