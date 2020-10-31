<template>
  <form v-on:submit.prevent="validateBeforeSubmit">
    <div class="columns input-group px-5">
      <div class="column is-1">
        <div class="field">
          <small>Search</small>
          <b-switch
            v-model="isShopSwitch"
            :rounded="false"
            type="is-danger"
            true-value="Shop"
            false-value="Product"
          >
          </b-switch>
          <small>{{ isShopSwitch.toLowerCase() }}</small>
        </div>
      </div>
      <div class="column is-10">
        <b-field
          :label="isShopSwitch.toLowerCase() + ' search'"
          v-if="isShopSwitch == 'Product'"
        >
          <b-autocomplete
            v-model="product"
            :data="filteredProductArray"
            placeholder='Try "Brownies", "Curry Puff"...'
            icon="magnify"
            clearable
            required
            @select="option => (productSelected = option)"

          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>
        <b-field
          :label="isShopSwitch.toLowerCase() + ' search'"
          v-if="isShopSwitch == 'Shop'"
        >
          <b-autocomplete
            v-model="shop"
            :data="filteredShopArray"
            placeholder='Try "The Sunshine Shop", "Rudy&apos;s bakes"...'
            icon="magnify"
            clearable
            required
            @select="option => (shopSelected = option)"
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>
      </div>
      <div class="column is-1">
        <b-field grouped style="min-width: 100%; min-height: 100%">
          <p class="control" style="min-width: 100%; min-height: 100%">
            <button
              v-on:click="goSearch()"
              class="button is-primary"
              style="min-width: 100%; min-height: 100%"
              type="submit"
              :disabled="!valid"
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
    shopSelected: function() {
      
      var shopId = this.shopIds[this.shopData.indexOf(this.shopSelected)];
      
      this.$router.push("/storefront/" + shopId);
    },
    productSelected: function() {
      var productId = this.productIds[this.productData.indexOf(this.productSelected)];
      
      this.$router.push("/storefront/product/" + productId);
    }
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
      productSelected: null
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
      if (this.isShopSwitch.toLowerCase() === "shop") {
        this.$router.push("/search?search_type=shop&shopQuery=" + this.shop);
        return;
      } else if (this.isShopSwitch.toLowerCase() === "product") {
        this.$router.push("/search?search_type=product&productQuery=" + this.product);
        return;
      }

      var productId = this.productIds[this.productData.indexOf(this.product)];
    },
  },
};
</script>