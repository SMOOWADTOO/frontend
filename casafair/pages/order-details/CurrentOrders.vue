<template>
    <section>
        <OrderCard v-for="i of orderData" v-bind:key="i.name" :rData="i"/>
        <div style="text-align:center;" v-if=!this.orderData.length>No orders currently</div>
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
                for (var order of ordersData) {
                    if (!order.completed) {
                        for (var orderDetail of order.order_details) {
                            let productInfo = {};
                            productInfo["isCurrent"] = true;
                            productInfo["quantity"] = orderDetail.quantity;
                            productInfo["total"] = orderDetail.total.toFixed(2);
                            productInfo["username"] = order.username;
                            productInfo["orderId"] = orderDetail.orderId;
                            let r = this.$axios.get(this.PRODUCTAPI + "/" + orderDetail.productId).then((response) => {
                                let productsData = response.data;
                                let product = productsData.product;
                                productInfo["desc"] = product.productDesc;
                                productInfo["name"] = product.productName;
                                productInfo["shopId"] = product.shopId;
                                productInfo["unitPrice"] = product.unitPrice;
                                this.orderData.push(productInfo);
                                console.log(productInfo);
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