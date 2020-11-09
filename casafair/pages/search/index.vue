<template>
  <section>
        <div class="columns mx-0">
            <div class="column is-12">
                <SearchBox/>
            </div>
        </div>
    <div
      class="columns is-multiline is-desktop"
      v-if="this.search_type === 'product'"
    >
      <div
        class="column"
        v-for="product in products"
        v-bind:key="product.productId"
      >
        <ProductCard :productInfo="product" />
      </div>
    </div>

    <div
      class="columns is-multiline is-desktop"
      v-if="this.search_type === 'shop'"
    >
      <div class="column is-4-desktop" v-for="shop in shops" v-bind:key="shop.shopId">
        <ShopCard :shopID="shop.shopId" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    if (this.$nuxt.$route.query.search_type === "shop") {
      // console.log(this.$nuxt.$route.query.shopQuery);
      var shopQuery = this.$nuxt.$route.query.shopQuery;
      this.fetchShopSearchResult(shopQuery);
    } else if (this.$nuxt.$route.query.search_type === "product") {
      // console.log(this.$nuxt.$route.query.shopQuery);
      var productQuery = this.$nuxt.$route.query.productQuery;
      this.search_type = "product";
      this.fetchProductSearchResult(productQuery);
    }
  },
  data() {
    return {
      shops: [],
      products: [],
      search_type: "shop",
    };
  },
  methods: {
    fetchShopSearchResult(shopQuery) {
      let r = this.$axios
        .get(this.SEARCHAPI + "/shop/" + shopQuery)
        .then((response) => {
          let respData = response.data;
          this.shops = respData;
          console.log(this.shops);
        })
        .catch((error) => {
          if (error.response != undefined) {
            var response = error.response.data;
            this.toastAlert(response.message, "is-danger", 5000);
          } else {
            this.toastAlert(error, "is-danger", 5000);
          }
        });
    },
    fetchProductSearchResult(productQuery) {
      let r = this.$axios
        .get(this.SEARCHAPI + "/product/" + productQuery)
        .then((response) => {
          let respData = response.data;
          console.log(respData);
          this.products = respData;
          console.log(this.products);
        })
        .catch((error) => {
          if (error.response != undefined) {
            var response = error.response.data;
            this.toastAlert(response.message, "is-danger", 5000);
          } else {
            this.toastAlert(error, "is-danger", 5000);
          }
        });
    },
  },
};
</script>