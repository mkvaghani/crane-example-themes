import { createVueServerApp } from '@lightspeed/crane'
import ClothesFooter from './ClothesFooter.vue'
import { Content, Design } from './type.ts'

export default createVueServerApp<Content, Design>(ClothesFooter)
