<template>
    <nuxt-link :to="'/storefront/' + rData.shopId">
        <div class="card is-fullimage">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img v-if="rData.shopImageURL != null" :src="rData.shopImageURL" :alt="rData.shopName + ' image'">
                    <img v-else src="@/assets/images/business_shop.svg"  :alt="rData.shopName + ' image'">
                </figure>
                <div class="card-stacked">
                    <div class="card-content to-bottom">
                        <div class="content is-overlay has-text-centered tag-for-pic">
                            <b-tooltip
                            type="is-dark"
                            position="is-top"
                            :label="rData.shopDesc"
                            multilined
                            animated
                            >
                                <b-tag type="is-primary" :size="this.windowWidth < 769 ? 'is-large' : 'is-small'" rounded multilined>
                                    {{rData.shopName}}
                                </b-tag>
                            </b-tooltip>
                            <!-- <p class="title is-5">{{rData.shopName}}</p> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nuxt-link>
</template>

<script>
export default {
    props: {
        rData: Object,
    },
    data() {
        return {

        }
    },
    methods: {
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