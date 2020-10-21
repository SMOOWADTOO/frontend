<template>
    <section>
        <ReviewCard v-for="i of reviewData" v-bind:key="i.name" :rData="i"/>
    </section>
</template>

<script>
export default {
    data() {
        return {
            reviewData: [{"name": "sadofijsdf", "review": "BAD"}, {"name": "lorem ipsum", "review": "give my money bacl"}]
        }
    },
    methods: {
        random() {
            return Math.floor(Math.random() * (10 - 1 + 1)) + 10;
        }
    }
}
</script>