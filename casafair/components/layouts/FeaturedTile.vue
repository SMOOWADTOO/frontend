<template>
    <div class="columns my-5">
        <div class="column">
            <DescriptionBox :title="featuredShopData.shopName" :description="featuredShopData.shopDesc"/>
        </div>
        <div class="column is-4">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <!-- owner description -->
                    <CaptionBox :description="ownerDetails"/>
                </div>
            </div>
        </div>
        <div class="column is-4 is-hidden-touch">
            <div class="columns is-multiline">
                <!-- iterate through product list of this featured business -->
                <div class="column is-6" v-for="product in products" v-bind:key="product.productId">
                    <ProductBox :product="product"/>
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
        featuredShopData: function() {
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
            let r = this.$axios.get(this.USERAPI + "/check/username/" + this.featuredShopData.username).then((response) => {
                let userData = response.data
                this.ownerDetails = userData.user
                console.log(this.ownerDetails)
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
            let r = this.$axios.get(this.PRODUCTAPI + "/by_store/" + this.featuredShopData.shopId).then((response) => {
                let respData = response.data
                this.products = respData.products
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