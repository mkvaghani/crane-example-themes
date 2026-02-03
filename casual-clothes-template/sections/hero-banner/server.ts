import { createVueServerApp } from '@lightspeed/crane'
import { Content, Design } from './type'
import HeroBanner from './HeroBanner.vue'

export default createVueServerApp<Content, Design>(HeroBanner)
