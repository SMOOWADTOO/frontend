<template>
    <div class="box">
        <div class="columns is-vcentered-mobile">
            <div class="columns is-vcentered card-content is-flex is-horizontal-center">
                <figure class="image is-128x128">
                    <img @click="goToShop(rData.shopId)" :src="rData.productPhotoURL">
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
        // mounted() {
        //     this.isCurrent(this.rData.isCurrent)
        // },
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
            }
            // isCurrent(current) {
            //     if (!current) {
            //         document.getElementById("receivedBtn").remove();
            //     }
            // }
        }
    }
</script>