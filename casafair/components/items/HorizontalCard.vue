<template>
    <div class="card" style="margin: 3rem 0;">
        <div class="columns">
            <div class="column">
                <div class="card-image">
                    <figure class="image is-4by3 has-background-grey-lighter">
                    </figure>
                </div>
            </div>
            <div class="column">
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title">{{productData.productName}}</p>
                            <p class="subtitle">{{productData.productDesc}}</p>
                        </div>
                    </div>

                    <div class="content">
                        <p>Price: ${{productData.unitPrice.toFixed(2)}}</p>
                    </div>
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