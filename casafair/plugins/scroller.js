import Vue from 'vue';
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register components here on vue
Object.defineProperty(Vue.prototype, '$gsap', { value: gsap });
Object.defineProperty(Vue.prototype, '$scrollTrigger', { value: ScrollTrigger });