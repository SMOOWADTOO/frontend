<template>
    <section>
        <v-dialog/>
        <OrderCard @click="showButtonsDialog(i)" v-for="i of orderData" v-bind:key="i.orderId" :rData="i"/>
        <div class="has-text-centered is-4" v-if=!this.orderData.length>
            <p class="icon is-large my-3">
                <!-- <i class="las la-store is-size-1"></i> -->
                <i class="las la-clipboard-list is-size-1"></i>
            </p>
            <p>No past orders</p>
        </div>
    </section>
</template>

<script>
export default {
    mounted() {
        this.fetchInformation()
    },
    data() {
        return {
            orderData: [],
        }
    },
    methods: {
        random() {
            return Math.floor(Math.random() * (10 - 1 + 1)) + 10;
        },
        fetchInformation() {
            let r = this.$axios.get(this.ORDERAPI + "/user/" + this.$auth.user.user.username).then((response) => {
                let objectData = response.data;
                let ordersData = objectData.orders;
                let orderCount = 0;
                for (var order of ordersData) {
                    if (order.completed) {
                        for (var orderDetail of order.order_details) {
                            let productInfo = {};
                            productInfo["isCurrent"] = false;
                            productInfo["quantity"] = orderDetail.quantity;
                            productInfo["total"] = orderDetail.total.toFixed(2);
                            productInfo["username"] = orderDetail.username;
                            productInfo["deliveryAddress"] = order.deliveryAddress;
                            productInfo["createdAt"] = order.createdAt;
                            productInfo["orderId"] = orderDetail.orderId;
                            productInfo["productId"] = orderDetail.productId;
                            let r = this.$axios.get(this.PRODUCTAPI + "/" + orderDetail.productId).then((response) => {
                                let productsData = response.data;
                                let product = productsData.product;
                                productInfo["desc"] = product.productDesc;
                                productInfo["name"] = product.productName;
                                productInfo["shopId"] = product.shopId;
                                productInfo["unitPrice"] = product.unitPrice;
                                productInfo["productPhotoURL"] = product.productPhotoURL;
                                this.orderData.push(productInfo);
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
                console.log(this.orderData);
                // this.productInfo = productsData.product
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