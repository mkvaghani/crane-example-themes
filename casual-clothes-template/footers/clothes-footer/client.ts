import { createVueClientApp } from '@lightspeed/crane'
import ClothesFooter from './ClothesFooter.vue'

import { Content, Design } from './type.ts'

export default createVueClientApp<Content, Design>(ClothesFooter)
