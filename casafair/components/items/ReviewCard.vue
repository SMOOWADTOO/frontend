<template>
    <div class="box">
        <article class="media">
            <div class="media-left card-content is-flex is-horizontal-center">
                <figure class="image is-128x128">
                    <img v-if="product.productPhotoURL == ''" src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                    <img v-else :src="product.productPhotoURL">
                </figure>
            </div>
            <div class="media-content is-vcentered">
                <div class="content">
                    <p>
                        <strong>{{product.productName}}</strong> <small>@{{rData.username}}</small> <small>{{reviewedAt}}</small>
                        <br>
                        <b-rate
                            v-model="rData.rating"
                            :maxs="5"
                            :show-score="true"
                            :show-text="true"
                            :texts="ratingTexts"
                            :spaced="true"
                            :disabled="true">
                        </b-rate>
                        <br>
                        {{rData.reviewDetail}}
                    </p>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    props: {
        rData: Object,
    },
    data() {
        return {
            product: {},
            shop: {}
        }
    },
    mounted() {
        this.fetchShop(),
        this.fetchProduct()
    },
    computed: {
        reviewedAt: function() {
            var publishedAt = this.rData.publishedTime;
            var pEpoch = Date.parse(publishedAt);
            var today = new Date();
            var tEpcoh = Date.parse(today);
            var diff = tEpcoh - pEpoch;
            var days = Math.floor(diff / (1000*60*60*24));
            if (days == 0) {
                return Math.floor(diff / 60000) + "m";
                if (minutes > 60) {
                    return Math.floor(diff/ 1000 * 60 * 60);
                }
            }
            return days + "d";
        } 
    },
    methods: {
        fetchShop() {
            let r = this.$axios.get(this.SHOPAPI + "/" + this.rData.shopId)
            .then((response) => {
                let objectData = response.data;
                this.shop = objectData.shop;
            }).catch((error) => {
                if (error.response != undefined) {
                    var response = error.response.data
                    this.toastAlert(response.message, "is-danger", 5000)
                } else {
                    this.toastAlert(error, "is-danger", 5000)
                }
            })
        },
        fetchProduct() {
            let r = this.$axios.get(this.PRODUCTAPI + "/" + this.rData.productId)
            .then((response) => {
                let objectData = response.data;
                this.product = objectData.product;
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