<template>
    <div class="columns px-5 page-content">
        <div class="column is-4 is-12-mobile">
            <UserCard :userID="$route.params.id" @shop="fetchShops"/>
        </div>
        <div class="column is-8 is-12-mobile is-centered" v-if="this.$route.params.id == this.$auth.user.user.id">
            <div class="title has-text-centered">Visit your Stores</div>
            <hr>
            <div class="columns is-multiline">
                <div class="column is-8 is-offset-2 mt-5 has-text-centered" v-if="shopData.length == 0">
                    <span class="icon is-large my-3">
                        <i class="las la-store is-size-1"></i>
                    </span>
                    <p>Oh no. You've got no shops. Create a store?</p>
                        <nuxt-link class="level-item" aria-label="create" :to="'/create-store/'">
                            <span class="icon is-large">
                                <i class="lar la-plus-square is-size-3" aria-hidden="true"></i>
                            </span>
                            New product
                        </nuxt-link>
                </div>
                
                <div class="column is-4-desktop is-6-tablet" v-for="shop in shopData" v-bind:key="shop.shopId" v-else>
                    <ShopBox :rData="shop"/>
                </div>
            </div>
        </div>
        <div class="column is-8 is-12-mobile is-centered" v-else>
            <div class="title has-text-centered">Have a look at some of my stores</div>
            <hr>
            <div class="columns is-multiline">
                <div class="column is-8 is-offset-2 mt-5 has-text-centered" v-if="shopData.length == 0">
                    <span class="icon is-large my-3">
                        <i class="las la-store is-size-1"></i>
                    </span>
                    <p>Oh no. I've got none yet...</p>
                </div>
                <div class="column is-4-desktop is-6-tablet" v-for="shop in shopData" v-bind:key="shop.shopId" v-else>
                    <ShopBox :rData="shop"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userData: [],
            shopData: []
        }
    },
    methods: {
        fetchShops(user) {
            let username = user.username
            let r = this.$axios.get(this.SHOPAPI + "/user/" + username)
            .then((response) => {
                let respData = response.data
                this.shopData = respData.shops
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