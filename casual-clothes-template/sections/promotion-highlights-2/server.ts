import { createVueServerApp } from '@lightspeed/crane'
import { Content, Design } from './type'
import PromotionHighlights2 from './PromotionHighlights2.vue'

export default createVueServerApp<Content, Design>(PromotionHighlights2)
