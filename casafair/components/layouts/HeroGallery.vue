<template>
    <b-carousel>
        <b-carousel-item v-for="img in imgURL" v-bind:key="img.id">
            <!-- <section :class="`hero is-medium`" :style="{backgroundImage: 'url(~' + img + ')' }"> -->
            <section :class="'hero is-medium carousel-img'" :style="{ backgroundImage: `url(${img.url})` }">
                <div class="hero-body has-text-centered">
                    <h1 class="title">{{img.text}}</h1>
                </div>
            </section>
        </b-carousel-item>
    </b-carousel>
</template>

<script>
import carouselImg from '~/assets/images/carousel_img.png'
import discover from '~/assets/images/discover.png'
import boss from '~/assets/images/boss.png'
export default {
    data() {
        return {
            imgURL: [
                {"id": 1, "url": carouselImg, "text": "Casafair."},
                {"id": 2, "url": discover, "text": "Discover."},
                {"id": 3, "url": boss, "text": "Be your own boss."}
            ], 
            
        }
    },
    methods: {
    }
}
</script>

<style>
.is-active .al img {
    filter: grayscale(0%);
}
.al img {
    filter: grayscale(100%);
}

.carousel-img {
    background-size: cover;
}
</style>