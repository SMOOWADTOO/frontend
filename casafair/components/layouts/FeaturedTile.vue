<template>
    <div class="columns my-5">
        <div class="column">
            <router-link :to="{path: '/storefront/' + featuredShopData.shopId}">

                <DescriptionBox :title="featuredShopData.shopName" :description="featuredShopData.shopDesc"
                    :shopID="featuredShopData.shopId" />
            </router-link>

        </div>
        <div class="column is-4">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <!-- owner description -->
                    <router-link :to="{path: '/storefront/' + featuredShopData.shopId}">
                        <CaptionBox :description="ownerDetails" />
                    </router-link>
                </div>
            </div>
        </div>
        <div class="column is-4 is-hidden-touch">
            <div class="columns is-multiline">
                <!-- iterate through product list of this featured business -->
                <div class="column is-6" v-for="product in products" v-bind:key="product.productId">
                    <router-link :to="{path: '/storefront/product/' + product.productId}">
                        <ProductBox :product="product" />
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.fetchFeaturedBusiness()
        },
        data() {
            return {
                title: "Le Business Name",
                description: "Lorem ipsum dolor sit amet consectur adispiscing",
                featuredShopData: {},
                didFetchUserDetails: false,
                ownerDetails: {},
                randomShopID: 1,
                products: [],
            }
        },
        watch: {
            featuredShopData: function () {
                if (this.featuredShopData != {}) {
                    this.fetchOwnerDetails()
                    this.fetchShopProducts()
                }
            }
        },
        methods: {
            fetchFeaturedBusiness() {
                let r = this.$axios.get(this.SHOPAPI + "/" + this.randomShopID).then((response) => {
                    let featuredShopData = response.data
                    this.featuredShopData = featuredShopData.shop
                    console.log(featuredShopData)
                }).catch((error) => {
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert(response.message, "is-danger", 5000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })
            },
            fetchOwnerDetails() {
                let r = this.$axios.get(this.USERAPI + "/check/username/" + this.featuredShopData.username).then((
                    response) => {
                    let userData = response.data
                    this.ownerDetails = userData.user
                    this.didFetchUserDetails = true
                }).catch((error) => {
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert(response.message, "is-danger", 5000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })
            },
            fetchShopProducts() {
                let r = this.$axios.get(this.PRODUCTAPI + "/by_store/" + this.featuredShopData.shopId).then((
                    response) => {
                    let respData = response.data
                    this.products = respData.products
                    var prod = respData.products
                    this.products = prod.slice(0,4)
                }).catch((error) => {
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert(response.message, "is-danger", 5000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })
            }
        }
    }
</script>