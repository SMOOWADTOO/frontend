<template>
    <div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">
            <div class="content">
                <p class="title is-6 mb-3">{{product.productName}}</p>
                <small>{{product.productDesc}}</small>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        product: Object,
    },
    data() {
        return {

        }
    },
    methods: {
    }
}
</script>

<style scoped>
    .card {
        border-radius: 5px;
    }

    img {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
</style>