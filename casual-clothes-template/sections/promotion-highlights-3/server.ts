import { createVueServerApp } from '@lightspeed/crane'
import { Content, Design } from './type.ts'
import PromotionHighlights3 from './PromotionHighlights3.vue'

export default createVueServerApp<Content, Design>(PromotionHighlights3)
