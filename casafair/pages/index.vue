<template>
    <section class="page-content">
        <div class="hero">
            <div class="hero-body">
                <HeroGallery/>
            </div>
        </div>
        <div class="columns mx-0">
            <div class="column is-12">
                <SearchBox @search="goSearch"/>
            </div>
        </div>
        <div class="columns mx-0">
            <div class="column is-12">
                <CardGallery/>
            </div>
        </div>
        <div class="columns has-background-dark mx-0 px-5">
            <div class="column is-12">
                <h1 class="has-text-light is-size-3 is-size-4-mobile has-text-weight-bold mt-5">
                    Featured home business
                </h1>
                <h2 class="has-text-light mb-5">
                    Recommended just for you.
                </h2>
                <FeaturedTile/>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    name: 'Home',

    head () {
        return {
            title: this.appName + " | " + this.appSlogan,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: this.appDescription }
            ]
        }
    },

    components: {
    },

    data() {
        return {
            hasLoaded: false,
        }
    },

    methods: {
        goSearch(searchParams) {
            var queryType = searchParams[0]
            var query = searchParams[1]
            if (queryType === "shop") {
                this.$router.push("/search?search_type=shop&shopQuery=" + query)
            } else if (queryType === "product") {
                this.$router.push("/search?search_type=product&productQuery=" + query);
            }
        },
    }
}
</script>
