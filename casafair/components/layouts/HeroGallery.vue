<template>
    <b-carousel>
        <b-carousel-item v-for="img in imgURL" v-bind:key="img.id">
            <nuxt-link class="level-item" aria-label="accept" :to="img.url">
                <section :class="'hero is-medium carousel-img'" :style="{ backgroundImage: `url(${img.imagesrc})` }">
                    <div class="hero-body has-text-centered">
                        <h1 class="title carousel-title">{{img.text}}</h1>
                        <span class="subtitle is-4 carousel-title">{{img.subtitle}}</span>
                    </div>
                </section>
            </nuxt-link>
        </b-carousel-item>
    </b-carousel>
</template>

<script>
    import carouselImg from '~/assets/images/carousel_img.jpg'
    import discover from '~/assets/images/discover.jpg'
    import boss from '~/assets/images/boss.jpg'
    export default {
        data() {
            return {
                imgURL: [{
                        "id": 1,
                        "url": "/about-us",
                        "imagesrc": carouselImg,
                        "text": "Casafair.", 
                        "subtitle": "Anyone can do business. From home. Click to learn more about us.", 

                    },
                    {
                        "id": 2,
                        "url": "/search",
                        "imagesrc": discover,
                        "text": "Discover.", 
                        "subtitle": "Explore our platform to find hidden gems from our local home businesses", 
                    },
                    {
                        "id": 3,
                        "url": "/register",
                        "imagesrc": boss,
                        "text": "Be your own boss.", 
                        "subtitle": "Sign up as a business owner now to bring your home business to new heights", 
                    }
                ],

            }
        },
        methods: {}
    }
</script>

<style>
    .is-active .al img {
        filter: grayscale(0%);
    }

    .al img {
        filter: grayscale(100%);
    }

    .hero {
        min-height: 30vh;
    }

    .carousel-img {
        min-height: 20vh;
        background:rgba(0,0,0,0.5);
        background-size: cover;
        width: 100%;
        height: auto;
        background-position: center;
        background-blend-mode: darken;
    }

    .carousel-title {
        color: white;
        -webkit-text-fill-color: white;
        /* Will override color (regardless of order) */
        -webkit-text-stroke-width: 0.2px;
        -webkit-text-stroke-color: black;
    }
</style>