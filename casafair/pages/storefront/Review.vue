<template>
    <section>
        <ReviewCard v-for="i of reviewData" v-bind:key="i.name" :rData="i"/>
    </section>
</template>

<script>
export default {
    data() {
        return {
            shopID: 0,
            reviewData: []
        }
    },
    created() {
        this.shopID = parseInt(this.$route.params.id)
    },
    mounted() {
        this.fetchInformation()
    },
    methods: {
        random() {
            return Math.floor(Math.random() * (10 - 1 + 1)) + 10;
        },
        fetchInformation() {
            let r = this.$axios.get(this.REVIEWAPI + "/" + this.shopID)
            .then((response) => {
                let objectData = response.data;
                let reviews = objectData.reviews;
                for (var review of reviews) {
                    this.reviewData.push(review);
                }
                console.log(this.reviewData);
            }).catch((error) => {
                if (error.response != undefined) {
                    var response = error.response.data
                    this.toastAlert(response.message, "is-danger", 5000)
                } else {
                    this.toastAlert(error, "is-danger", 5000)
                }
            })
        }
    }
}
</script>