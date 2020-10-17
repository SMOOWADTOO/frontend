<template>
    <section>
        <div class="columns is-multiline is-desktop">
            <div class="column is-4-desktop" v-for="i in random()" v-bind:key="i">
                <ProductCard/>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    methods: {
        random() {
            return Math.floor(Math.random() * (10 - 1 + 1)) + 10;
        }
    }
}
</script>