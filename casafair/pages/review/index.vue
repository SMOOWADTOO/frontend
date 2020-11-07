<template>
    <div class="container page-content">
        <!-- <div class="is-centered"> -->
        <h1 class="title has-text-grey-dark has-text-centered-touch has-text-centered">Leave a Review</h1>

            <!-- <h2>Leave a Review</h2> -->
        <!-- </div> -->
        <div class="columns is-centered is-vcentered">
            <div class="column is-3 is-offset-2">
                <figure class="image">
                    <img v-if="productURL == ''" src="https://bulma.io/images/placeholders/128x128.png">
                    <img v-else :src="productURL">
                    <p class="is-size-5-mobile is-size-3-touch">
                        Shop: {{shopName}} <br>
                        Product: {{product}}
                    </p>
                </figure>
            </div>
            <!-- <div class="column is-1"></div> -->
            <div class="column is-5 is-offset-1">
                <div class="field">
                    <div class="control">
                        Title*
                        <input class="input is-primary" type="text" v-model="title" placeholder="Please input a title" required>
                    </div>
                </div>

                Overall Rating
                <b-rate v-model="rating"></b-rate>

                <div class="field">
                    <div class="control">
                        Comment*
                        <textarea class="textarea is-primary" v-model="comment" placeholder="Please input a comment" required></textarea>
                    </div>
                </div>

                <div class="columns is-centered">
                    <div class="column is-6">
                        <button @click="submitReview()" class="button is-medium is-fullwidth is-primary">Submit</button>
                    </div>
                    <div class="column is-6">
                        <button @click="cancelBtn()" class="button is-medium is-fullwidth is-primary is-outlined">Cancel</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                shopId: this.$route.params.allIds.split("-")[0],
                orderId: this.$route.params.allIds.split("-")[1],
                productId: this.$route.params.allIds.split("-")[2],
                title: "",
                rating: 0,
                comment: "",
                shopName: "",
                product: "",
                productURL: ""
            }
        },
        mounted() {
            this.fetchShopInfo(),
            this.fetchProductInfo()
        },
        methods: {
            fetchShopInfo() {
                let r = this.$axios.get(this.SHOPAPI + "/" + this.shopId)
                .then((response) => {
                    var info = response.data;
                    var shop = info.shop;
                    this.shopName = shop.shopName;
                }).catch((error) => {
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert(response.message, "is-danger", 5000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })
            },
            fetchProductInfo() {
                let r = this.$axios.get(this.PRODUCTAPI + "/" + this.productId)
                .then((response) => {
                    var info = response.data;
                    var product = info.product;
                    this.product = product.productName;
                    this.productURL = product.productPhotoURL;
                }).catch((error) => {
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert(response.message, "is-danger", 5000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })
            },
            submitReview() {
                // let r = this.$axios.post(this.REVIEWAPI, {
                let r = this.$axios.post("http://localhost:7005/review/add", {
                    "rating": this.rating,
                    "reviewDetail": this.comment,
                    "shopId": this.shopId,
                    "orderId": this.orderId,
                    "productId": this.productId,
                    "title": this.title,
                    "username": this.$auth.user.user.username
                }).then((response) => {
                    this.toastAlert("Review Submitted", "is-success", 5000)
                    this.$router.push("/order-details");
                }).catch((error) => {
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert(response.message, "is-danger", 5000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })
            },
            cancelBtn() {
                this.$router.push("/order-details");
            },
        }
    }
</script>