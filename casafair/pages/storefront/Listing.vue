<template>
    <section>
        <div class="columns is-multiline is-desktop">
            <div class="column is-4-desktop" v-for="product in products" v-bind:key="product.productId">
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