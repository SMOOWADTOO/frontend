<template>
    <div class="card is-fullimage">
        <div class="card-image">
            <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
            </figure>
            <div class="card-stacked">
                <div class="card-content to-bottom">
                    <div class="content">
                        <p class="title is-5">{{product.productName}}</p>
                    </div>
                </div>
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