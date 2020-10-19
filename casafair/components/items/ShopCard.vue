<template>
    <div :class="this.windowWidth > 768 ? 'card mx-3 my-3 sticky-box sticky-top' : 'card'">
        <div class="card-image is-hidden-mobile">
            <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">
            <div class="columns is-centered has-text-centered is-hidden-mobile">
                <div class="column is-12">
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                    <p class="title is-4">My Shop Name</p>
                    <p class="subtitle is-6">@shop_name</p>
                </div>
            </div>

            <div class="content is-hidden-mobile">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                <a href="#">#css</a> <a href="#">#responsive</a>
                <br>
                <br>
                <b-rate
                    v-if="!this.route.includes('/storefront/product')" 
                    v-model="rating"
                    :maxs="5"
                    :show-score="score"
                    :show-text="true"
                    :texts="ratingTexts"
                    :spaced="true"
                    :disabled="true">
                </b-rate>
                <small>Since 1 Jan 2016</small>
                <br>
            </div>
            <hr class="is-hidden-mobile">
            <div class="content" v-if="this.route.includes('/storefront/product')">
                <p class="is-size-4 title">Get this item</p>
                <b-field label="Quantity" :type="formFields.quantity.type" :message="formFields.quantity.message">
                    <b-numberinput controls-position="compact" v-model="quantity" min=1 max=300 expanded></b-numberinput>
                </b-field>
                <hr>
                <nav class="level is-mobile">
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Price</p>
                            <p class="title">S$ {{calculatedPrice.toFixed(2)}}</p>
                        </div>
                    </div>
                </nav>
                <button class="button is-primary is-fullwidth mt-5" :disabled="this.quantity >= 300">Get it now</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.route = this.$route.fullPath
        if (process.client) {
            this.windowWidth = window.innerWidth
            window.onresize = () => {
                this.windowWidth = window.innerWidth
            }
        }
        this.calculatedPrice = this.price * this.quantity
    },

    watch: {
        quantity: function() {
            if (this.quantity >= 0) {
                this.calculatedPrice = this.price * this.quantity

                if (this.quantity >= 300) {
                    this.formFields.quantity.message = "Limit reached. Please contact the business directly."
                    this.formFields.quantity.type = "is-danger"
                } else {
                    this.formFields.quantity.message = ""
                    this.formFields.quantity.type = ""
                }
            }
        }
    },

    props: {
        rating: Number,
        price: Number,
    },

    data() {
        return {
            // responsive tabs
            windowWidth: 0,
            route: "",

            // Ratings
            ratingTexts: ['Very bad', 'Bad', 'Good', 'Very good', 'Awesome'],

            // purchases
            quantity: 1,
            calculatedPrice: 0,

            formFields: {
                "quantity": {
                    "type": "", "message": ""
                },
            }
        }
    },

    methods: {
    }
}
</script>