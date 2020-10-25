<template>
    <div class="box">
        <div class="columns">
            <div class="column is-3">
                <figure class="image is-128x128">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                </figure>
            </div>
            <div class="column is-8">
                <p class="subtitle is-6">Product Name</p>
                <p class="title is-6">$12.34</p>
                <div class="buttons has-addons">
                    <button class="button">-</button>
                    <button class="button is-static">1</button>
                    <button class="button">+</button>
                </div>
            </div>
            <!-- to delete order, need to make it responsiveand replace x with icon -->
            <div class="column is-1">
                <p class="buttons">
                    <button class="button is-small is-white">
                        <span class="icon is-small">
                            <div class="title is-6">x</div>
                        </span>
                    </button>
                </p>
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