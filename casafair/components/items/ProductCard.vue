<template>
  <nuxt-link :to="'/storefront/product/' + productInfo.productId">
    <!-- <figure class="image is-1by1">
      <img :src="productInfo.productPhotoURL" />
      <p
        class="is-overlay mx-5 is-size-4-desktop is-size-3-touch"
        style="margin-top: 60%"
      >
        {{ productInfo.productName }}
        <br />
        <small class="is-size-6">{{ productInfo.productDesc }}</small>
      </p>
    </figure> -->

    <div class="card">
      <div class="card-image">
        <figure class="image is-1by1">
          <img :src="productInfo.productPhotoURL" />
        </figure>
      </div>
      <div class="card-content is-overlay has-text-centered">
        <b-tooltip
            type="is-light"
          position="is-bottom"
          :label="productInfo.productDesc"
          multilined
          animated
          
        >
          <b-tag type="is-primary" size="is-medium" rounded>
            {{ productInfo.productName }}
          </b-tag>
        </b-tooltip>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    productInfo: Object,
  },
};
</script>

<style scoped>
img {
  border-radius: 10px !important;
}
</style>