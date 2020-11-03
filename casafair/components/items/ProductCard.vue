<template>
    <nuxt-link :to="'/storefront/product/' + productInfo.productId">
        <!-- <figure class="image is-1by1">
            <img :src="productInfo.productPhotoURL">
            <p class="is-overlay mx-5 is-size-4-desktop is-size-3-touch" style="margin-top: 60%;">
                {{productInfo.productName}}
                <br>
                <small class="is-size-6">{{productInfo.productDesc}}</small>
            </p>
        </figure> -->
        <div class="card is-fullimage full-height">
        <div class="card-image">
            <figure class="image is-4by3">
                <img :src="productInfo.productPhotoURL">
            </figure>
            <div class="card-stacked full-height">
                <div class="card-content equal-height to-bottom">
                    <div class="media-content">
                        <!-- <span><span class="title is-4">{{productInfo.productName}}</span><br>{{productInfo.productDesc}}</span> -->

                        <!-- <p class="title is-4">{{productInfo.productName}}</p> -->
                    </div>

                    <div class="content">
                        <span><span class="title is-4">{{productInfo.productName}}</span><br>{{productInfo.productDesc}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </nuxt-link>
</template>

<script>
export default {
    props: {
        productInfo: Object,
    }
}
</script>

<style scoped>
    img {
        border-radius: 10px !important;
    }
</style>