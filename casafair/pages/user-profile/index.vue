<template>
    <div class="columns">
        <div class="column is-4 is-12-mobile">
            <UserCard/>
        </div>
        <div class="column is-8 is-12-mobile is-centered">
            <div class="title has-text-centered">Shopping Cart</div>
            <hr>
            
            <ShoppingCartCard v-for="i of reviewData" v-bind:key="i.name" :rData="i"/>
        </div>
    </div>
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