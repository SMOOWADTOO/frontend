<template>
    <div id="app" class="container">

        <b-carousel-list v-model="test" :data="productsData" :items-to-show="showItems" v-if="hasLoaded">
            <template slot="item" slot-scope="list">
                <router-link :to="{path: '/storefront/product/' + list.productId}">
                    <HorizontalCard :productData="list" />
                </router-link>
            </template>
        </b-carousel-list>
        <div v-else>
            <div class="columns is-centered">
                <span class="column is-6" v-for="i in 2" v-bind:key="i">
                    <LoadingCard/>
                </span>

            </div>
        </div>

    </div>

</template>

<script>
    export default {
        data() {
            return {
                // responsive measurements
                windowWidth: 0,

                arrow: true,
                arrowHover: true,
                drag: true,
                gray: false,
                opacity: false,
                values: 1,
                perList: 2,
                increment: 2,
                repeat: true,
                productsData: [],
                hasLoaded: false,
                showItems: 2
            }
        },
        mounted() {
            this.fetchProducts()
            if (process.client) {
                this.windowWidth = window.innerWidth
                window.onresize = () => {
                    this.windowWidth = window.innerWidth
                }
            }
        },
        watch: {
            windowWidth: function() {
                if (this.windowWidth <= 576) {
                    this.showItems = 1
                } else if (this.windowWidth > 576 && this.windowWidth <= 1024) {
                    this.showItems = 2
                } else {
                    this.showItems = 3
                }
            }
        },
        methods: {
            fetchProducts() {
                let r = this.$axios.get(this.PRODUCTAPI).then((response) => {
                    let productsData = response.data
                    this.productsData = productsData.products
                    this.hasLoaded = true
                }).catch((error) => {
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert(response.message, "is-danger", 5000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })
            }
        },
    }
</script>