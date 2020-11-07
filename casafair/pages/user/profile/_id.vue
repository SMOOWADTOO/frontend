<template>
    <div class="columns px-5 page-content">
        <div class="column is-4 is-12-mobile">
            <UserCard :userID="$route.params.id"/>
        </div>
        <div class="column is-8 is-12-mobile is-centered">
            <div class="title has-text-centered">Reviews</div>
            <hr>
<!-- should change this to product purchase card (create new) -->
            <ReviewCard v-for="i of reviewData" v-bind:key="i.name" :rData="i"/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userData: [],
            reviewData: [{"name": "sadofijsdf", "review": "BAD"}, {"name": "lorem ipsum", "review": "give my money bacl"}]
        }
    },
    methods: {
    }
}
</script>