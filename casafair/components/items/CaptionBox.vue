<template>

    <div class="card is-fullimage equal-height">
        <div class="card-image">
            <figure class="image">
                <img :src="profile.profilePhotoURL" :alt="profile.firstName + '\'s photo'">
            </figure>
            <div class="card-stacked full-height">
                <div class="card-content equal-height to-bottom">
                    <div class="media-content">
                        <p class="title is-4">{{shopOwner}}</p>
                    </div>

                    <div class="content">
                        <b-skeleton width="100%" :animated="true" v-if="this.loading"></b-skeleton>
                        <span v-else>{{profile.description}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        props: {
            description: String,
        },
        watch: {
            description: function () {
                this.fetchOwnerProfile()
            }
        },
        data() {
            return {
                profile: {},
                loading: true,
            }
        },
        methods: {
            fetchOwnerProfile() {
                let r = this.$axios.get(this.USERAPI + "/profile/" + this.description.id).then((response) => {
                    this.shopOwner = response.data.user_profile.firstName; 
                    this.loading = false
                    this.profile = response.data.user_profile
                }).catch((error) => {
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert(response.message, "is-danger", 5000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })
            },
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