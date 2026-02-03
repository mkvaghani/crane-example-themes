import { createVueServerApp } from '@lightspeed/crane'
import CustomHeader from './CustomHeader.vue'
import { Content, Design } from './type.ts'

export default createVueServerApp<Content, Design>(CustomHeader)
