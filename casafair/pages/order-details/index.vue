<template>
    <div class="columns is-centered  is-vcentered">
        <!-- <div class="column is-3">
            <div class="title has-text-centered">Order ID: 12345678</div>
            <figure class="image">
                <img src="https://bulma.io/images/placeholders/128x128.png">
                <p class="is-overlay mx-5 is-size-4-desktop is-size-3-touch" style="margin-top: 60%;">
                    Product Name
                    <br>
                    <small class="is-size-6">Product Description</small>
                </p>
            </figure>
        </div>
        <div class="column is-1"></div> -->
        <!-- <div class="column is-5">
            <div class="title is-3">$12.96</div>
            <div class="subtitle is-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum
            </div>
            <div class="columns is-centered">
                <div class="column is-5">
                    <h6 class="title is-6">Store:</h6>
                </div>
                <div class="column is-5">
                    <h6 class="subtitle is-6">SMOOWADTOO</h6>
                </div>
            </div>
            <div class="columns is-centered">
                <div class="column is-5">
                    <h6 class="title is-6">Delivery Address:</h6>
                </div>
                <div class="column is-5">
                    <h6 class="subtitle is-6">Blk 123 Berseh #12-100 S(2123456)</h6>
                </div>
            </div>
            <div class="columns is-centered">
                <div class="column is-5">
                    <h6 class="title is-6">Estimated Delivery Date:</h6>
                </div>
                <div class="column is-5">
                    <h6 class="subtitle is-6">8 November 2020</h6>
                </div>
            </div>
            <button class="button is-medium is-fullwidth is-primary is-outlined">CANCEL ORDER</button>
        </div> -->
        <div class="column is-8 is-12-mobile">
            <b-tabs v-model="activeTab" position="is-centered" :size="this.windowWidth > 420 ? 'is-medium' : 'is-small'" type="is-boxed" expanded>
                <b-tab-item label="Current Orders">
                    <CurrentOrders/>
                </b-tab-item>
                <b-tab-item label="Past Orders">
                    <PastOrders/>
                    <!-- <OrderCard v-for="i of reviewData" v-bind:key="i.name" :rData="i" /> -->
                </b-tab-item>
            </b-tabs>
        </div>
    </div>
</template>

<script>
import CurrentOrders from '@/pages/order-details/CurrentOrders'
import PastOrders from '@/pages/order-details/PastOrders'

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
        CurrentOrders,
        PastOrders
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
    },

    data() {
        return {
            activeTab: 0,

            // responsive tabs
            windowWidth: 0,
        }
    }
}
</script>