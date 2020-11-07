<template>
    <section class="container px-3 my-5 page-content">
        <div class="columns is-vcentered">
            <div class="column is-8">
                <div class="card is-fullimage">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img :src="productInfo.productPhotoURL" :alt="productInfo.productName + ' image'">
                            <!-- <p class="is-overlay mx-5 is-size-4-desktop is-size-3-touch" style="margin-top: 60%;">
                                {{productInfo.productName}}
                            </p> -->
                        </figure>
                        <div class="card-stacked full-height">
                            <div class="card-content equal-height to-bottom no-bkgrd">
                                <div class="media-content">
                                    <!-- <p class="title is-4">{{productInfo.productName}}</p> -->
                                </div>

                                <div class="content">
                                    <b-skeleton width="100%" :animated="true" v-if="this.loading"></b-skeleton>
                                    <div v-else><span class="title is-4">{{productInfo.productName}}</span><br>{{productInfo.productDesc}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="column is-4">
                <client-only>
                    <ShopCard :price="productInfo.unitPrice" :shopID="productInfo.shopId" :productInfo="productInfo" />
                </client-only>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        created() {
            this.productID = this.$route.params.id
            console.log(this.$route.params.id)

            this.fetchInformation()
        },
        mounted() {
            this.fetchInformation()
        },
        data() {
            return {
                productID: 0,
                productInfo: {}
            }
        },
        methods: {
            fetchInformation() {
                let r = this.$axios.get(this.PRODUCTAPI + "/" + this.productID).then((response) => {
                    let productsData = response.data
                    this.productInfo = productsData.product
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