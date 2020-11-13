<template>
    <section>
        <ReviewCard v-for="i of reviewData" v-bind:key="i.name" :rData="i"/>
        <div class="column is-8 is-offset-2 mt-5 has-text-centered" v-if="reviewData.length == 0">
            <p class="icon is-large my-3">
                <i class="las la-envelope-open-text is-size-1"></i>
            </p>
            <p>No reviews for this store</p>
        </div>
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
                let totalRating = 0
                let ratingCount = 0
                for (var review of reviews) {
                    this.reviewData.push(review);
                    totalRating += review.rating
                    ratingCount += 1
                }
                let finalRating = totalRating / ratingCount
                console.log(totalRating / ratingCount)
                this.$emit("rating", [finalRating, ratingCount])
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