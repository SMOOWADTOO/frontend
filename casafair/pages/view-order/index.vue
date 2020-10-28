<template>
    <section>
        <div class="columns is-centered">
            <div class="column is-10 is-12-mobile is-centered">
                <div class="title has-text-centered">Current Orders</div>
                <hr>

                <ViewCurrentOrderCard v-for="i of reviewData" v-bind:key="i.name" :rData="i" />
            </div>
        </div>


        <div class="columns is-centered">
            <div class="column is-10 is-12-mobile is-centered">
                <div class="title has-text-centered">Past Orders</div>
                <hr>

                <ViewPastOrderCard v-for="i of reviewData" v-bind:key="i.name" :rData="i" />
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                reviewData: [{
                    "name": "sadofijsdf",
                    "review": "BAD"
                }, {
                    "name": "lorem ipsum",
                    "review": "give my money bacl"
                }]
            }
        },
        methods: {
            random() {
                return Math.floor(Math.random() * (10 - 1 + 1)) + 10;
            }
        }
    }
</script>