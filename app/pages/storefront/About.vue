<template>
    <section>
        <client-only>
            <HeroCard :title="'Hello, it\'s ' + this.shopData == undefined ? '' : this.shopData.shopName + '.'" :description="this.shopData == undefined ? '' : this.shopData.shopDesc"/>
        </client-only>
        <div class="columns is-3 my-5 is-vcentered is-centered">
            <div class="column">
                <h1 class="is-size-4">We're right here:</h1>
                <br>
                <client-only>
                    <iframe
                    width="100%"
                    frameborder="0" style="border:0; height:50vh;"
                    :src="mapsURL" allowfullscreen v-if="this.apiHasLoaded">
                    </iframe>
                </client-only>
            </div>
        </div>
        <nav class="level">
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Contact Number</p>
                    <p class="title" v-if="this.apiHasLoaded">{{this.shopData.contactNo.length > 8 ? '+' + this.shopData.contactNo : this.shopData.contactNo}}</p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                <p class="heading">Website</p>
                <a class="title has-text-info is-size-6" :href="this.shopData.website"><u>Visit us</u></a>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                <p class="heading">Email</p>
                <a class="title has-text-info is-size-6" :href="'mailto:' + this.shopData.website"><u>Email us</u></a>
                </div>
            </div>
        </nav>
    </section>
</template>


<script>
export default {
    data() {
        return {
            map: null,
            mapsURL: "https://www.google.com/maps/embed/v1/place?key=AIzaSyC_qUafRGiice8SqQAUqWFFhxsTuja4enU&q=",
            apiHasLoaded: false,
            shopData: {},
        };
    },
    props: {
        shopID: 0,
    },
    created() {
    },
    methods: {
        fetchShop() {
            let r = this.$axios.get(this.SHOPAPI + "/" + this.shopID).then((response) => {
                let shopData = response.data
                this.shopData = shopData.shop
                var options = { year: 'numeric', month: 'long', day: 'numeric' };
                this.shopData.createdAt = new Date(this.shopData.createdAt).toLocaleDateString('en-GB', options)
                this.mapsURL += shopData.shop.address
                this.apiHasLoaded = true
            }).catch((error) => {
                if (error.response != undefined) {
                    var response = error.response.data
                    this.toastAlert(response.message, "is-danger", 5000)
                } else {
                    this.toastAlert(error, "is-danger", 5000)
                }
            })
        },
    },
}
</script>