<template>
    <div class="columns">
        <div class="column is-4 is-12-mobile">
            <ShopCard ref="shopCard" :rating="this.rate" :shopID="this.shopID"/>
        </div>
        <div class="column is-8 is-12-mobile">
            <b-tabs v-model="activeTab" position="is-centered" :size="this.windowWidth > 420 ? 'is-medium' : 'is-small'" type="is-boxed" expanded>
                <b-tab-item label="Listing">
                    <Listing/>
                </b-tab-item>
                <b-tab-item label="Reviews">
                    <Review/>
                </b-tab-item>
                <b-tab-item label="About">
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

    created() {
        this.shopID = parseInt(this.$route.params.id)
    },

    mounted() {
        if (process.client) {
            this.windowWidth = window.innerWidth
            window.onresize = () => {
                this.windowWidth = window.innerWidth
            }
        }
        this.$refs.shopCard.fetchShop()
    },

    data() {
        return {
            shopID: 0,
            pageName: "Storefront",
            pageDescription: "Storefront for ",

            activeTab: 0,

            // responsive tabs
            windowWidth: 0,

            // shop details
            rate: 4.6,
        }
    }
}
</script>