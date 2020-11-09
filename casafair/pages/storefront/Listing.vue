<template>
    <section>
        <div class="columns is-multiline">
            <div class="column is-8 is-offset-2 mt-5 has-text-centered" v-if="products.length == 0">
                <span class="icon is-large my-3">
                    <i class="las la-store is-size-1"></i>
                </span>
                <p>Oh no. You've got no products. List a product?</p>
                    <nuxt-link class="level-item" aria-label="accept" :to="'/storefront/product/new?shopID=' + this.$route.params.id">
                        <span class="icon is-large">
                            <i class="lar la-plus-square is-size-3" aria-hidden="true"></i>
                        </span>
                        New product
                    </nuxt-link>
            </div>
            
            <div class="column is-4-desktop is-6-tablet" v-for="product in products" v-bind:key="product.productId" v-else>
                <ProductCard :productInfo="product"/>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            shopID: 0,
            products: []
        }
    },
    created() {
        this.shopID = parseInt(this.$route.params.id)
    },
    mounted() {
        this.fetchShopProducts()
    },
    methods: {
        fetchShopProducts() {
            let r = this.$axios.get(this.PRODUCTAPI + "/by_store/" + this.shopID).then((response) => {
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