<template>
    <div class="columns is-centered  is-vcentered">
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
            title: this.title,
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

        if (!this.$auth.user) {
            this.$router.push("/")
        }
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
            title: "Casafair | Create Store",
            activeTab: 0,

            // responsive tabs
            windowWidth: 0,
        }
    }
}
</script>

<style scoped>
    section {
        min-height: 75vh;
    }
</style>