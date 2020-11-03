<template>
    <div class="box">
        <div class="columns is-vcentered-mobile">
            <div>
                <figure class="image is-128x128">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                </figure>
            </div>
            <div class="column is-9-mobile">
                <p class="title is-5">{{rData.name}}</p>
                <p class="subtitle is-6">{{rData.desc}}</p>
                <p class="title is-6">x {{rData.quantity}}</p>
            </div>
            <div class="column is-3-mobile is-3" style="text-align: center; font-size: large;">
                <b>${{rData.total}}</b><br>
                <button id="receivedBtn" class="button is-primary is-outlined signature-dark-purple-shadows" @click="orderReceived(rData.orderId, rData.username)">Order Received</button>
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
        mounted() {
            this.isCurrent(this.rData.isCurrent)
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
            isCurrent(current) {
                if (!current) {
                    document.getElementById("receivedBtn").remove();
                }
            }
        }
    }
</script>