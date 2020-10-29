<template>
    <div class="box">
        <div class="columns is-vcentered">
            <div class="column is-3">
                <figure class="image is-128x128">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                </figure>
            </div>
            <div class="column is-8">
                <p class="subtitle is-5">Product Name</p>
                <p class="title is-6">Quantity: 3</p>
                <p class="title is-6">Estimated Delivery: 8 November 2020</p>
                <input class="button" type="submit" value="VIEW ORDER">
            </div>


        </div>
    </div>
</template>

<script>
    export default {
        props: {
            rData: Object,
        }
    }
</script>