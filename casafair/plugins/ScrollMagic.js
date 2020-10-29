import Vue from 'vue';
import * as ScrollMagic from 'scrollmagic';
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

Object.defineProperty(Vue.prototype, '$scrollmagic', { value: ScrollMagic });
Object.defineProperty(Vue.prototype, '$gsap', { value: gsap });
Object.defineProperty(Vue.prototype, '$scrollTrigger', { value: ScrollTrigger });