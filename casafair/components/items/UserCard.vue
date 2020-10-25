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
                    <p class="title is-4">My User Name</p>
                    <p class="subtitle is-6">I like to shop</p>
                </div>
            </div>

            <!-- <hr>
            <div class="columns is-centered has-text-centered">
                <div class="column is-6">
                    <p class="title is-6">1,234</p>
                    <p class="subtitle is-7">Followers</p>
                </div>
                <div class="column is-6">
                    <p class="title is-6">100</p>
                    <p class="subtitle is-7">Following</p>
                </div>
            </div> -->
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

    // Not sure if this is needed for user
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