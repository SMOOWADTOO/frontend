<template>
  <section style="min-height: 80vh;">
        <div class="columns mx-0">
            <div class="column is-12">
                <SearchBox @search="goSearch"/>
            </div>
        </div>
        <div class="columns">
            <div class="column is-6 is-offset-3 has-text-centered">
              <h3 class="title has-text-gray">Your search have returned {{search_type === 'product' ? products.length : shops.length}} results.</h3>
            </div>
        </div>
    <div
      class="columns is-multiline is-desktop mx-5 px-5 my-5"
      v-if="this.search_type === 'product'"
    >
      <div
        class="column is-3"
        v-for="product in products"
        v-bind:key="product.productId"
      >
        <ProductCard :productInfo="product" />
      </div>
    </div>

    <div
      class="columns is-multiline is-desktop mx-5 px-5 my-5"
      v-if="this.search_type === 'shop'"
    >
      <div class="column is-3" v-for="shop in shops" v-bind:key="shop.shopId">
        <ShopCard :shopID="shop.shopId" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
      this.goSearch()
  },
  data() {
    return {
      shops: [],
      products: [],
      search_type: "shop",
    };
  },
  methods: {
    goSearch(searchParams) {
        var queryType = searchParams === undefined ? this.$nuxt.$route.query.search_type : searchParams[0]
        if (queryType === "shop") {
            var query = searchParams === undefined ? this.$nuxt.$route.query.shopQuery : searchParams[1]
            var shopQuery = this.$nuxt.$route.query.shopQuery;
            this.search_type = queryType;
            this.fetchShopSearchResult(query);
        } else if (queryType === "product") {
            var query = searchParams === undefined ? this.$nuxt.$route.query.productQuery : searchParams[1]
            var productQuery = this.$nuxt.$route.query.productQuery;
            this.search_type = queryType;
            this.fetchProductSearchResult(query);
        }
    },
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