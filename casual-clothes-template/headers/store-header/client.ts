import { createVueClientApp } from '@lightspeed/crane'
import CustomHeader from './CustomHeader.vue'
import { Content, Design } from './type.ts'

export default createVueClientApp<Content, Design>(CustomHeader)
