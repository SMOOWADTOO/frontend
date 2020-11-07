<template>
    <div class="card is-horizontal is-vcentered">
        <div class="card-image" style="max-width:50%">
            <figure class="image is-4by3 has-background-grey-lighter">
                <img :src="productData.productPhotoURL" :alt="productData.productName + ' image'"
                    v-if="productData.productPhotoURL != null">
            </figure>
        </div>
        <div class="card-stacked">
            <div class="card-content">
                <div class="media-content">
                    <p class="title is-6 content-title">{{productData.productName}}</p>
                    <p class="subtitle is-6 content-text">{{productData.productDesc}}</p>
                </div>

                <div class="content">
                    <br>
                    Price: ${{productData.unitPrice.toFixed(2)}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            productData: Object,
        },
        data() {
            return {
                animated: true
            }
        },
    }
</script>