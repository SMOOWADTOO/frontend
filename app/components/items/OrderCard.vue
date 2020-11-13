<template>
    <div class="box">
        <div class="columns is-centered is-vcentered-mobile">
            <div class="column is-vcentered-mobile card-content is-flex-mobile is-horizontal-center-mobile">
                <figure class="image is-1by1-mobile">
                    <img :src="rData.productPhotoURL">
                </figure>
            </div>
            <div class="column is-9-mobile">
                <p class="title is-5">{{rData.name}}</p>
                <p class="subtitle is-6">{{rData.desc}}</p>
                <p class="title is-6">Quantity: {{rData.quantity}}</p>
                <p v-if="rData.isCurrent" class="is-6">Estimated Delivery Date: {{rData.deliveryDate}}</p>
                <p v-else class="is-6 has-text-success">Successfully Delivered</p>
                <p class="is-6">Delivery Address: {{rData.deliveryAddress}}</p>
                <p class="is-6">Order Number: {{rData.orderId}} </p>
            </div>
            <div class="column is-3-desktop is-12-mobile is-centered is-vcentered-mobile has-text-centered">
                <b>${{rData.total}}</b><br><br>
                <button v-if="rData.isCurrent" id="receivedBtn" class="button is-primary is-outlined signature-dark-purple-shadows is-fullwidth" @click="orderReceived(rData.orderId, rData.username)">Order Received</button>
                <!-- <button v-else id="receivedBtn" class="button is-primary is-outlined signature-dark-purple-shadows" @click="orderReceived(rData.orderId, rData.username)">Order Received</button> -->
                <b v-else-if="isReviewed" id="reviewed">Reviewed</b>
                <button v-else id="reviewBtn" class="button is-primary is-outlined signature-dark-purple-shadows is-fullwidth" @click="submitReview(rData.shopId, rData.orderId, rData.productId)">Review</button>
                <p><br><a class="my-3" @click="showDialog">View details</a></p>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        props: {
            rData: Object,
            activeTab: Number
        },
        data() {
            return {
                isReviewed: false
            }
        },
        mounted() {
            // this.isCurrent(this.rData.isCurrent)
            this.hasReviewed(this.rData.orderId)
        },
        methods: {
            orderReceived(orderId, username) {
                let r = this.$axios.post(this.ORDERAPI + "/edit", {
                    orderId: orderId,
                    username: username,
                    completed: true
                }).then((response) => {
                    let productsData = response.data;
                    window.location.href = "/order-details"
                }).catch((error) => {
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert(response.message, "is-danger", 5000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })
            },
            goToShop(shopId) {
                this.$router.push("/storefront/" + shopId);
            },
            goToProduct(productId) {
                this.$router.push("/storefront/product/" + productId);
            },
            submitReview(shopId, orderId, productId) {
                var allIds = shopId + "-" + orderId + "-" + productId;
                this.$router.push({name: 'review', params: {allIds: allIds}})
            },
            hasReviewed(orderId) {
                let r = this.$axios.get(this.REVIEWAPI + "/done/" + orderId)
                // let r = this.$axios.get("http://localhost:7005/review/done/" + orderId)
                .then((response) => {
                    let info = response.data;
                    this.isReviewed = info.isReviewed;
                }).catch((error) => {
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert(response.message, "is-danger", 5000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })
            },
            showDialog() {
                var currText = `<b>` + this.rData.name + ` x` + this.rData.quantity + `</b>` + `
                <br>Unit Price: $` + this.rData.unitPrice.toFixed(2) + `
                <br>GST: $` + (this.rData.unitPrice * 0.07).toFixed(2) + `
                <br>Total Cost: $` + this.rData.total + `
                <br><br>Estimated Delivery Date: ` + this.rData.deliveryDate + `
                <br>Delivery Address: ` + this.rData.deliveryAddress + `
                <hr>Order #` + this.rData.orderId + `
                <br>Order Created: ` + this.rData.createdAt;

                var pastText = `<b>` + this.rData.name + ` x` + this.rData.quantity + `</b>` + `
                <br>Unit Price: $` + this.rData.unitPrice.toFixed(2) + `
                <br>GST: $` + (this.rData.unitPrice * 0.07).toFixed(2) + `
                <br>Total Cost: $` + this.rData.total + `
                <br><br><p class='has-font-weight-bold has-text-success'>Successfully Delivered</p>` + `
                Delivery Address: ` + this.rData.deliveryAddress + `
                <hr>Order ID: ` + this.rData.orderId + `
                <br>Order Created: ` + this.rData.createdAt;

                var text = pastText;
                if (this.rData.isCurrent) {
                    text = currText;
                }

                this.$buefy.dialog.alert({
                    title: 'Order details',
                    message: text,
                    confirmText: 'Ok'
                })
            }
        }
    }
</script>