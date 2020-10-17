<template>
    <div class="container">
        <!-- If car cards gallery -->
        <swiper ref="mySwiper" :options="swiperOptions" v-if="hasLoaded" >
            <swiper-slide style="padding:2rem 0;" v-for="detail in details" v-bind:key="detail.id">
                <router-link :to="{path: '/view/'}">
                    <VerticalCard :details="detail"/>
                </router-link>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <swiper ref="mySwiper" :options="swiperOptions" v-else>
            <swiper-slide style="padding:2rem 0;" v-for="i in 3" v-bind:key="i">
                <LoadingCard/>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!-- Add Arrows -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import VerticalCard from '@/components/items/VerticalCard.vue'
import LoadingCard from '@/components/items/LoadingCard.vue'
// import API from '@/constants/api_constants.js'
export default {
    data() {
        return {
            details: [],
            hasLoaded: false,
            swiperOptions: {
                lazy: true,
                slidesPerView: 3,
                spaceBetween: 30,
                // slidesPerGroup: 3,
                centeredSlides: true,
                loop: true,
                // loopFillGroupWithBlank: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    // type: 'progressbar',
                },
                breakpoints: {
                    160: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                }
            }
        }
    },
    mounted() {
    },
    components: {
        Swiper,
        SwiperSlide,
        VerticalCard,
        LoadingCard
    },
    directives: {
        swiper: directive
    },
    methods: {
    },
}
</script>