import Vue from 'vue';
import * as ScrollMagic from 'scrollmagic';
import { gsap } from 'gsap'

Object.defineProperty(Vue.prototype, '$scrollmagic', { value: ScrollMagic });
Object.defineProperty(Vue.prototype, '$gsap', { value: gsap });