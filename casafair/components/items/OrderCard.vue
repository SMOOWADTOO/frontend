<template>
    <div class="box" @click="showButtonsDialog">
        <!-- <v-dialog/> -->
        <modal @click="showModal" name="example">This is</modal>
        <div class="columns is-vcentered-mobile">
            <div class="columns is-vcentered card-content is-flex is-horizontal-center">
                <figure class="image is-128x128">
                    <img :src="rData.productPhotoURL">
                </figure>
            </div>
            <div class="column is-9-mobile">
                <p class="title is-5">{{rData.name}}</p>
                <p class="subtitle is-6">{{rData.desc}}</p>
                <p class="title is-6">x {{rData.quantity}}</p>
                <p v-if="rData.isCurrent" class="is-6">Estimated Delivery Date: {{rData.deliveryDate}}</p>
                <p v-else class="is-6" style="color: #f5a167">Successfully Delivered</p>
                <p class="is-6">Delivery Address: {{rData.deliveryAddress}}</p>
                <p class="is-6">Order Number: {{rData.orderId}} </p>
            </div>
            <div class="column is-3-mobile is-3" style="text-align: center; font-size: large;">
                <b>${{rData.total}}</b><br><br>
                <button v-if="rData.isCurrent" id="receivedBtn" class="button is-primary is-outlined signature-dark-purple-shadows" @click="orderReceived(rData.orderId, rData.username)">Order Received</button>
                <!-- <button v-else id="receivedBtn" class="button is-primary is-outlined signature-dark-purple-shadows" @click="orderReceived(rData.orderId, rData.username)">Order Received</button> -->
                <p v-else-if="isReviewed" id="reviewed" class="subtitle">Reviewed</p>
                <button v-else id="reviewBtn" class="button is-primary is-outlined signature-dark-purple-shadows" @click="submitReview(rData.shopId, rData.orderId, rData.productId)">Review</button>
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
            // isCurrent(current) {
            //     if (!current) {
            //         document.getElementById("receivedBtn").remove();
            //     }
            // }
            showButtonsDialog() {
                var currText = `<b>` + this.rData.name + ` x` + this.rData.quantity + `</b>` + `
                <br>Unit Price: $` + this.rData.unitPrice.toFixed(2) + `
                <br>GST: $` + (this.rData.unitPrice * 0.07).toFixed(2) + `
                <br>Total Cost: $` + this.rData.total + `
                <br><br>Estimated Delivery Date: ` + this.rData.deliveryDate + `
                <br>Delivery Address: ` + this.rData.deliveryAddress + `
                <hr>Order ID: ` + this.rData.orderId + `
                <br>Order Created: ` + this.rData.createdAt;

                var pastText = `<b>` + this.rData.name + ` x` + this.rData.quantity + `</b>` + `
                <br>Unit Price: $` + this.rData.unitPrice.toFixed(2) + `
                <br>GST: $` + (this.rData.unitPrice * 0.07).toFixed(2) + `
                <br>Total Cost: $` + this.rData.total + `
                <br><br>Successfully Delivered` + `
                <br>Delivery Address: ` + this.rData.deliveryAddress + `
                <hr>Order ID: ` + this.rData.orderId + `
                <br>Order Created: ` + this.rData.createdAt;

                var text = pastText;
                if (this.rData.isCurrent) {
                    text = currText;
                }
                this.$modal.show('dialog', {
                    title: 'Order Details',
                    text: text,
                    buttons: [
                    {
                        title: 'Cancel',
                        handler: () => {
                        this.$modal.hide('dialog')
                        }
                    },
                    {
                        title: 'Visit Shop',
                        handler: () => {
                            this.goToShop(this.rData.shopId);
                        }
                    },
                    {
                        title: 'View Product',
                        handler: () => {
                            this.goToProduct(this.rData.productId);
                        }
                    }
                    ]
                })
            },
            showModal() {
                this.$modal.show('example');
            }
        }
    }
</script>