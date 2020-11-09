<template>
  <nuxt-link :to="'/storefront/product/' + productInfo.productId">
    <div class="card">
      <div class="card-image">
        <figure class="image is-1by1">
            <img :src="productInfo.productPhotoURL" alt="Product image" v-if="productInfo.productPhotoURL != null">
            <img src="@/assets/images/product.svg" alt="Product image" v-else>
        </figure>
      </div>
      <div class="card-content is-overlay has-text-centered tag-for-pic">
        <b-tooltip
          type="is-light"
          position="is-top"
          :label="productInfo.productDesc"
          multilined
          animated
        >
          <b-tag type="is-primary" :size="this.windowWidth < 769 ? 'is-large' : 'is-small'" rounded multilined>
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
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  data() {
    return {
      windowWidth: 0,
    };
  },
};
</script>

<style scoped>
img {
  border-radius: 10px !important;
}
.tag-for-pic {
  margin-top: 70%;
}

@media (max-width: 768px) {
  .tag-for-pic {
    margin-top: 80%;
  }
}
</style>