import { createVueClientApp } from '@lightspeed/crane'
import { Content, Design } from './type'
import HeroBanner from './HeroBanner.vue'

export default createVueClientApp<Content, Design>(HeroBanner)
