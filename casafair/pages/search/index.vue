<template>
    <section>
        <StaticPageHeader :heroClass="'has-text-centered'" :title="pageName" :description="pageDescription"/>
        <div class="columns" style="min-height: 80vh;">
            <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
            <div class="column is-8 is-offset-2">
                <div class="columns mx-0">
                    <div class="column is-12">
                        <SearchBox @search="goSearch"/>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-6 is-offset-3 has-text-centered">
                        <h3 class="title has-text-grey is-size-5">Your search has returned {{search_type === 'product' ? products.length : shops.length}} result{{count == 0 || count > 1 ? 's' : ''}}.</h3>
                    </div>
                </div>
                <hr>
                <div
                class="columns is-multiline mx-5 px-5 my-5"
                v-if="this.search_type === 'product'"
                >
                    <div
                        class="column is-3-widescreen is-6-desktop is-12-tablet"
                        v-for="product in products"
                        v-bind:key="product.productId"
                    >
                        <ProductCard :productInfo="product" />
                    </div>
                </div>

                <div
                class="columns is-multiline mx-5 px-5 my-5"
                v-if="this.search_type === 'shop'"
                >
                    <div class="column is-3-widescreen is-6-desktop is-12-tablet" v-for="shop in shops" v-bind:key="shop.shopId">
                        <ShopBox :rData="shop" />
                    </div>
                </div>
            </div>
        </div>
  </section>
</template>

<script>
export default {
  mounted() {
      if (Object.keys(this.$route.query).length === 0 && this.$route.query.constructor === Object) {
        this.isLoading = false
      } else {
        this.goSearch()
      }
  },
  watch: {
      query: function() {
          this.goSearch()
      }
  },
  head () {
        return {
            title: this.appName + " | Searching for " + this.query,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: this.appDescription }
            ]
        }
    },
  data() {
    return {
        count: 0,
        shops: [],
        products: [],
        search_type: "shop",
        pageName: "Search Results",
        pageDescription: "",
        query: "",

        isLoading: true
    };
  },
  methods: {
    goSearch(searchParams) {
        this.isLoading = true;
        var queryType = searchParams === undefined ? this.$nuxt.$route.query.search_type : searchParams[0]
        if (queryType === "shop") {
            var query = searchParams === undefined ? this.$nuxt.$route.query.shopQuery : searchParams[1]
            this.query = query;
            if (searchParams !== undefined) {
                this.$router.push("/search?search_type=shop&shopQuery=" + searchParams[1])
            } else {
                var shopQuery = this.$nuxt.$route.query.shopQuery;
                this.search_type = queryType;
                this.fetchShopSearchResult(query);
            }
        } else if (queryType === "product") {
            var query = searchParams === undefined ? this.$nuxt.$route.query.productQuery : searchParams[1]
            this.query = query
            if (searchParams !== undefined) {
                this.$router.push("/search?search_type=product&productQuery=" + searchParams[1])
            } else {
                var productQuery = this.$nuxt.$route.query.productQuery;
                this.search_type = queryType;
                this.fetchProductSearchResult(query);
            }
        }
    },
    fetchShopSearchResult(shopQuery) {
      let r = this.$axios
        .get(this.SEARCHAPI + "/shop/" + shopQuery)
        .then((response) => {
          let respData = response.data;
          this.shops = respData;
          this.isLoading = false;
          this.count = this.shops.length
        })
        .catch((error) => {
          this.count = 0
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
          this.products = respData;
          this.isLoading = false
          this.count = this.products.length
        })
        .catch((error) => {
            this.count = 0
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