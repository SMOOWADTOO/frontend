<template>
    <div :class="this.windowWidth > 768 ? 'card mx-3 my-3 sticky-box sticky-top' : 'card'">
        <div class="card-image">
            <figure class="image is-4by3">
                <img :src="userData.profilePhotoURL" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">
            <div class="columns is-centered has-text-centered">
                <div class="column is-12">
                    <p class="title is-4">{{userData.firstName}} {{userData.lastName}}</p>
                    <p class="subtitle is-6">{{userData.description}}</p>
                    <small></small>
                </div>
                <br>
            </div>
            <div class="columns is-centered has-text-centered" v-if="!!this.$auth.user && this.shopData != [] && this.$auth.user.user.id == this.$route.params.id">
                <div class="column is-12">
                    <hr>
                    <!-- <p class="title is-6">{{this.shopData.length == 0 ? "You've got no stores. Create one?" : "Visit your stores"}}</p>
                    <nuxt-link class="level-item" aria-label="create" :to="'/create-store/'" v-if="this.shopData.length == 0">
                        Create your first store!
                    </nuxt-link>
                    <nuxt-link v-for="shop in shopData" v-bind:key="shop.shopId" class="level-item" aria-label="visit store" :to="'/storefront/' + shop.shopId">
                        {{shop.shopName}}
                    </nuxt-link>
                    <hr> -->
                    <nuxt-link class="level-item" aria-label="create" :to="'/create-store/'">
                        Create a new store
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(this.$auth)
        this.route = this.$route.fullPath
        if (process.client) {
            this.windowWidth = window.innerWidth
            window.onresize = () => {
                this.windowWidth = window.innerWidth
            }
        }
        this.fetchUserData()

        if (this.$auth.loggedIn && this.$route.params.id == this.$auth.user.user.id) {
            this.hasStore()
        }
    },

    watch: {
    },

    props: {
        userID: Number,
    },

    methods: {
        fetchUserData() {
            let r = this.$axios.get(this.USERAPI + "/profile/" + this.$route.params.id).then((
                response) => {
                let userData = response.data
                this.userData = userData.user_profile
                this.$emit("shop", userData.user_profile)
            }).catch((error) => {
                if (error.response != undefined) {
                    var response = error.response.data
                    this.toastAlert(response.message, "is-danger", 5000)
                } else {
                    this.toastAlert(error, "is-danger", 5000)
                }
            })
        },
        hasStore() {
            let r = this.$axios.get(this.SHOPAPI + "/user/" + this.$auth.user.user.username)
            .then((resp) => {
                if (resp.data.shops.length > 0) {
                    var shop = resp.data.shops[0];
                    this.shopData = resp.data.shops
                }
            }).catch((error) => {
                if (error.response != undefined) {
                    var response = error.response.data
                    this.toastAlert(response, "is-danger", 2000)
                } else {
                    this.toastAlert(error, "is-danger", 5000)
                }
            })
        },
    },

    // Not sure if this is needed for user
    data() {
        return {
            userData: {},
            shopData: [],
        }
    }
}
</script>