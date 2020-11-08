<template>
  <form v-on:submit.prevent="validateBeforeSubmit">
    <div class="columns is-desktop input-group is-vcentered">
      <div class="column is-desktop" id="search-toggle">
        <div class="field has-text-centered">
          <label for="search-switch" id="switch-label">Product/Shop</label
          ><br />
          <b-tooltip
            label="Switch to search for Product or Shop"
            type="is-primary is-light"
            size="is-small"
            position="is-right"
            multilined
          >
            <b-switch
              v-model="isShopSwitch"
              :rounded="false"
              type="is-secondary"
              true-value="Shop"
              false-value="Product"
              id="search-switch"
              size="is-medium"
              passive-type="is-warning"
            >
            </b-switch>
          </b-tooltip>
        </div>
      </div>

      <div class="column is-8">
        <b-field
          :label="isShopSwitch + ' Search'"
          v-if="isShopSwitch == 'Product'"
        >
          <b-autocomplete
            v-model="product"
            :data="filteredProductArray"
            placeholder='Try "Brownies", "Curry Puff"...'
            icon="magnify"
            class="search-bar"
            clearable
            required
            @select="(option) => (productSelected = option)"
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>
        <b-field
          :label="isShopSwitch + ' Search'"
          v-if="isShopSwitch == 'Shop'"
        >
          <b-autocomplete
            v-model="shop"
            :data="filteredShopArray"
            placeholder='Try "The Sunshine Shop", "Rudy&#39;s bakes"...'
            icon="magnify"
            class="search-bar"
            clearable
            required
            @select="(option) => (shopSelected = option)"
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>
      </div>
      <div class="column is-2">
        <b-field grouped style="min-width: 100%; min-height: 100%">
          <p class="control" style="min-width: 100%; min-height: 100%">
            <button
              v-on:click="goSearch()"
              class="button is-primary"
              style="min-width: 100%; min-height: 100%"
              type="submit"
              :disabled="!valid"
              id="search-submit"
            >
              Search
            </button>
          </p>
        </b-field>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    productSearch: String,
    shopSearch: String,
  },
  mounted() {
    this.getShopNames(), this.getProductNames();
  },
  watch: {
    shopSelected: function () {
      var shopId = this.shopIds[this.shopData.indexOf(this.shopSelected)];

      this.$router.push("/storefront/" + shopId);
    },
    productSelected: function () {
      var productId = this.productIds[
        this.productData.indexOf(this.productSelected)
      ];

      this.$router.push("/storefront/product/" + productId);
    },
  },
  computed: {
    filteredShopArray() {
      return this.shopData.filter((option) => {
        return (
          option.toString().toLowerCase().indexOf(this.shop.toLowerCase()) >= 0
        );
      });
    },
    filteredProductArray() {
      return this.productData.filter((option) => {
        return (
          option.toString().toLowerCase().indexOf(this.product.toLowerCase()) >=
          0
        );
      });
    },
  },
  data() {
    return {
      valid: true,
      errors: false,

      // form values

      product: "",

      shop: "",

      shopData: [],
      shopIds: [],
      productData: [],
      productIds: [],
      isShopSwitch: "Shop",
      shopSelected: null,
      productSelected: null,
    };
  },
  methods: {
    validateBeforeSubmit() {},
    getShopNames() {
      let r = this.$axios
        .get(this.SHOPAPI + "/all")
        .then((response) => {
          let shopsData = response.data;
          var shopsInfo = shopsData.shops;
          for (var shop of shopsInfo) {
            this.shopData.push(shop.shopName);
            this.shopIds.push(shop.shopId);
          }
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
    getProductNames() {
      let r = this.$axios
        .get(this.PRODUCTAPI)
        .then((response) => {
          let productsData = response.data;
          var productsInfo = productsData.products;
          for (var product of productsInfo) {
            this.productData.push(product.productName);
            this.productIds.push(product.productId);
          }
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
    goSearch() {
      if (this.shop == "" && this.isShopSwitch.toLowerCase() === "shop")
        this.toastAlert("Please type in a shop name", "is-warning", 5000);
      else if (this.isShopSwitch.toLowerCase() === "shop" && this.shop != "") {
        this.$router.push("/search?search_type=shop&shopQuery=" + this.shop);
        return;
      }
      if (
        this.product == "" &&
        this.isShopSwitch.toLowerCase() === "product"
      )
        this.toastAlert("Please type in a product name", "is-warning", 5000);
      else if (
        this.isShopSwitch.toLowerCase() === "product" &&
        this.product != ""
      ) {
        this.$router.push(
          "/search?search_type=product&productQuery=" + this.product
        );
        return;
      }

      var productId = this.productIds[this.productData.indexOf(this.product)];
    },
  },
};
</script>