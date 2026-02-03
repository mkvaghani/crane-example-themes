import { createVueClientApp } from '@lightspeed/crane'
import Testimonials from './Testimonials.vue'
import { Content, Design } from './type.ts'

export default createVueClientApp<Content, Design>(Testimonials)
