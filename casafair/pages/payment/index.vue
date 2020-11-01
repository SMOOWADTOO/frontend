<template>
    <section class="hero is-fullheight page-content">
        <div class="hero-body" v-if="!pageHasExpired">
            <div class="container hero-container">
                <div class="columns">
                    <div class="column is-6 is-offset-1">
                        <div class="card">
                            <div class="card-content">
                                <div class="content">
                                    <h1 class="title has-text-signature">What you're buying</h1>
                                    <div class="columns is-mobile is-multiline">
                                        <div class="column is-12" v-for="item in this.paymentResponse.purchasedProducts" v-bind:key="item.productId">
                                            <p class="subtitle">Item ID #{{item.productId}}</p>
                                            <p><span class="has-text-weight-bold">Product:</span> {{item.productName}}</p>
                                            <p><span class="has-text-weight-bold">Product Description:</span> {{item.productDesc}}</p>
                                            <p><span class="has-text-weight-bold">Quantity:</span> {{item.quantity}}</p>
                                            <p><span class="has-text-weight-bold">Price per item:</span> $ {{item.unitPrice}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card">
                            <div class="card-content">
                                <div class="content" v-if="!paymentSuccess">
                                    <p>Please fill in your payment details:</p>
                                    <!-- Display a payment form -->
                                    <form id="payment-form" v-on:submit.prevent="payWithCard">
                                        <div id="card-element"></div>
                                        <br>
                                        <!-- <p :class="errorClass">{{this.ccErrors}}</p> -->
                                        <div class="columns">
                                            <div class="column is-12">
                                                <button :class="buttonClass" id="submit" style="min-width:100%" :disabled="paymentButtonDisabled">
                                                    <div class="spinner" id="spinner"></div>
                                                    <span id="button-text">Pay</span>
                                                </button>
                                                <small v-if="paymentButtonDisabled && !paymentSuccess">Transacting, please do NOT close this window...</small>
                                                <b-progress :type="progressType" size="is-small" v-if="paymentButtonDisabled && !paymentSuccess"></b-progress>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="content" v-if="paymentSuccess">
                                    <p>Payment successful.</p>
                                    <a class="button is-success" style="min-width:100%" v-on:click="nextAction">Continue</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column is-4">
                        <div class="card">
                            <div class="card-content">
                                <div class="content">
                                    <h1 class="title has-text-signature">Today's charges</h1>
                                    <div class="columns is-mobile">
                                        <div class="column is-8">
                                            <b-tooltip :label="beforeTaxLabel" dashed type="is-light" multilined>
                                                <p>Amount before Taxes</p>
                                            </b-tooltip>
                                        </div>
                                        <div class="column has-text-right">
                                            <p><u>$ {{this.paymentResponse.pretax}}</u></p>
                                        </div>
                                    </div>
                                    <div class="columns is-mobile">
                                        <div class="column">
                                            <b-tooltip :label="gstLabel" dashed type="is-light" multilined>
                                                <p>GST</p>
                                            </b-tooltip>
                                        </div>
                                        <div class="column has-text-right">
                                            <p><u>$ {{this.paymentResponse.gst}}</u></p>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="columns is-mobile">
                                        <div class="column">
                                            <h3 class="is-size-4 is-size-6-mobile has-text-weight-bold">Total</h3>
                                        </div>
                                        <div class="column has-text-right">
                                            <h3 class="is-size-4 is-size-6-mobile has-text-weight-bold">$ {{this.paymentResponse.amount}}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hero-body" v-else>
            <div class="container hero-container">
                <div class="columns">
                    <div class="column is-6 is-offset-3">
                        <div class="card">
                            <div class="card-content">
                                <div class="content">
                                    <h1>{{this.pageExpiredLabel}}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    head() {
        return {
            script: [
                // { src: "https://js.stripe.com/v3/" },
            ]
        }
    },
    mounted() {
        // payment token
        var sessionToken = this.$route.query.session

        this.token = sessionToken

        if (this.token == undefined) {
            this.$router.push("/")
        } else {
            this.createPaymentIntent()
            const stripe = this.$stripe.import()
            this.stripe = stripe

            const elements = stripe.elements()

            var style = {
            base: {
                    color: "#333333",
                    fontFamily: 'Courier, monospace',
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {
                    color: "#333333"
                    }
                },
                invalid: {
                    fontFamily: 'Courier, monospace',
                    color: "#ff0048",
                    iconColor: "#ff0048"
                }
            };
            const card = elements.create('card', {
                hidePostalCode: true,
                style: style,
            });
            // Add an instance of the card Element into the `card-element` <div>
            card.mount('#card-element')

            this.card = card
        }
    },
    data() {
        return {
            pageHasExpired: false,
            pageExpiredLabel: "",

            userInfo: {},

            clientSecret: "",
            stripe: {
                default: Object,
            },
            card: {
                default: Object,
            },
            paymentResponse: {
                default: Object,
            },
            beforeTaxLabel: "Total amount before tax.",
            gstLabel: "This is the Government's goods & services tax",

            ccErrors: "",
            errorClass: "is-hidden has-text-danger",
            paymentButtonDisabled: false,
            buttonClass: "is-signature button",
            progressType: "is-light",
            paymentSuccess: false,
        }
    },
    methods: {
        getInfo() {
            let r = this.$axios.get(this.USERAPI + "/profile/me").then((response) => {
                var userInfo = response.data.user
                this.userInfo = userInfo
                console.log(this.userInfo)
            }).catch((error) => {
                if (error.response != undefined) {
                    var response = error.response.data
                    this.toastAlert(response.message, "is-danger", 5000)
                } else {
                    this.toastAlert(error, "is-danger", 5000)
                }
            })
        },
        createPaymentIntent() {
            let r = this.$axios.post(this.PAYMENTAPI + "/intent", {
                "paymentToken": this.token,
            }).then((paymentResponse) => {
                console.log(paymentResponse.data)
                if (paymentResponse.data.type == "success") {
                    this.paymentResponse = paymentResponse.data
                    this.clientSecret = paymentResponse.data.clientSecret
                    this.getInfo()
                } else {
                    this.pageHasExpired = true
                    this.pageExpiredLabel = "Page has expired. Please go back and try again."
                }
                
            }).catch((error) => {
                if (error.response != undefined) {
                    var response = error.response.data
                    this.toastAlert(response.message, "is-danger", 5000)
                } else {
                    this.toastAlert(error, "is-danger", 5000)
                }
                this.pageHasExpired = true
            })
        },
        payWithCard() {
            this.paymentButtonDisabled = true
            this.buttonClass = "is-dark button is-hidden"

            var timeElapsedSinceIAT = (new Date() - new Date(this.paymentResponse.iat))/ 1000 / 60
            
            if (timeElapsedSinceIAT <= 5) {
                this.stripe.confirmCardPayment(this.clientSecret, {
                    payment_method: {
                        card: this.card,
                        billing_details: {
                            name: this.$auth.user.first_name + " " + this.$auth.user.last_name,
                            email: this.$auth.user.email
                        },
                    }
                })
                .then((result) => {
                    if (result.error) {
                        // Show error to your customer
                        this.toastAlert("Error: " + result.error.message, "is-danger", 20000)
                        this.ccErrors = result.error.message
                        this.errorClass = "has-text-danger"
                        this.paymentButtonDisabled = false
                        this.buttonClass = "is-signature button"
                    } else {
                        // The payment succeeded!
                        this.toastAlert("Payment was successful!", "is-success", 5000)
                        this.progressType = "is-success"
                        this.paymentSuccess = true
                        this.confirmTransaction()
                    }
                })
            } else {
                this.toastAlert("Payment session has expired. Please go back and try again.", "is-danger", 5000)
                this.paymentButtonDisabled = false
                this.buttonClass = "is-signature button"
            }
        },
        confirmTransaction() {
            var orderDetails = []
            var purchasedProduct = this.paymentResponse.purchasedProducts[0]

            orderDetails.push({
                "price": purchasedProduct.unitPrice,
                "productId": purchasedProduct.productId,
                "quantity": purchasedProduct.quantity,
                "total": this.paymentResponse.amount
            })

            let r = this.$axios.post(this.ORDERAPI + "/create", {
                "completed": false,
                "deliveryAddress": "SMU SIS",
                "paid": true,
                "order_details": orderDetails,
                "pickupAddress": "SMU SOE",
                "username": this.$auth.user.user.username
            }).then((paymentResponse) => {
                this.toastAlert("Paid success", "is-info", 5000)
            }).catch((error) => {
                if (error.response != undefined) {
                    var response = error.response.data
                    this.toastAlert(response.message, "is-danger", 5000)
                } else {
                    this.toastAlert(error, "is-danger", 5000)
                }
            })
        },
        nextAction() {
            this.pageHasExpired = true
            this.$route.query.session = ""
            this.$router.push("/order-details")
        },
    }

}
</script>