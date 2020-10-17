<template>
    <div class="columns">
        <div class="column is-4 is-12-mobile">
            <div :class="this.windowWidth > 768 ? 'card mx-3 my-3 sticky-box sticky-top' : ''">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="columns is-centered has-text-centered">
                        <div class="column is-12">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                            <p class="title is-4">My Shop Name</p>
                            <p class="subtitle is-6">@shop_name</p>
                        </div>
                    </div>

                    <div class="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                        <a href="#">#css</a> <a href="#">#responsive</a>
                        <br>
                        <br>
                        <b-rate
                            v-model="rate"
                            :maxs="5"
                            :show-score="score"
                            :show-text="true"
                            :texts="ratingTexts"
                            :spaced="true"
                            :disabled="true">
                        </b-rate>
                        <small>Since 1 Jan 2016</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="column is-8 is-12-mobile">
            <b-tabs v-model="activeTab" position="is-centered" :size="this.windowWidth > 420 ? 'is-medium' : 'is-small'" type="is-boxed" expanded>
                <b-tab-item label="Listing" icon="google-photos">
                    <Listing/>
                </b-tab-item>
                <b-tab-item label="Reviews" icon="library">
                    <Review/>
                </b-tab-item>
                <b-tab-item label="About" icon="video">
                    <About/>
                </b-tab-item>
            </b-tabs>
        </div>
    </div>
</template>

<script>
import Listing from '@/pages/storefront/Listing'
import Review from '@/pages/storefront/Review'
import About from '@/pages/storefront/About'

export default {
    head () {
        return {
            title: this.appName + " | " + this.pageName,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: this.pageDescription }
            ]
        }
    },

    components: {
        Listing,
        Review,
        About
    },

    mounted() {
        if (process.client) {
            this.windowWidth = window.innerWidth
            window.onresize = () => {
                this.windowWidth = window.innerWidth
            }
        }
    },

    data() {
        return {
            pageName: "Storefront",
            pageDescription: "Storefront for ",

            activeTab: 0,

            // responsive tabs
            windowWidth: 0,

            // shop details
            rate: 4.6,
            ratingTexts: ['Very bad', 'Bad', 'Good', 'Very good', 'Awesome'],
        }
    }
}
</script>

<style scoped>
    .sticky-box {
        top: 10vh !important;
        z-index: 0;
    }

    .sticky-top {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 29;
    }
</style>