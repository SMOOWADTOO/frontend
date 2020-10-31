<template>
    <form v-on:submit.prevent="validateBeforeSubmit">
        <div class="columns input-group px-5 is-vcentered">
            <div class="column is-2" id="search-toggle">
                <div class="field is-vcentered level-right">
                    <label for="search-switch" id="switch-label">Change</label>
                    <b-switch v-model="isShopSwitch"
                        :rounded="false"
                        type="is-secondary"
                        true-value="Shop"
                        false-value="Product"
                        id="search-switch"
                        size="is-medium"
                        passive-type='is-warning'
                        >
                    </b-switch>
                </div>
            </div>
            <div class="column is-9">
                <b-field :label="isShopSwitch + ' Search'" v-if="isShopSwitch == 'Product'">
                    <b-autocomplete
                        v-model="product"
                        :data="filteredCarArray"
                        placeholder="Try &quot;Brownies&quot;, &quot;Curry Puff&quot;..."
                        icon="magnify"
                        class="search-bar"
                        clearable
                        required>
                        <template slot="empty">No results found</template>
                    </b-autocomplete>
                </b-field>
                <b-field :label="isShopSwitch + ' Search'" v-if="isShopSwitch == 'Shop'">
                    <b-autocomplete
                        v-model="shop"
                        :data="filteredDataArray"
                        placeholder="Try &quot;The Sunshine Shop&quot;, &quot;Rudy's bakes&quot;..."
                        icon="magnify"
                        class="search-bar"
                        clearable
                        required>
                        <template slot="empty">No results found</template>
                    </b-autocomplete>
                </b-field>
            </div>
            <div class="column">
                <b-field grouped style="min-width:100%; min-height:100%;">
                    <p class="control" style="min-width:100%; min-height:100%;">
                        <button class="button is-primary" style="min-width:100%; min-height:100%;" type="submit" :disabled="!valid" id="search-submit">Search</button>
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
    },
    computed: {
        filteredDataArray() {
            return this.shopData.filter((option) => {
                return option
                    .toString()
                    .toLowerCase()
                    .indexOf(this.shop.toLowerCase()) >= 0
            })
        },
        filteredCarArray() {
            return this.productData.filter((option) => {
                return option
                    .toString()
                    .toLowerCase()
                    .indexOf(this.product.toLowerCase()) >= 0
            })
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
            productData: [],
            isShopSwitch: "Shop",
        }
    },
    methods: {
        validateBeforeSubmit() {
        },
        getShopNames() {
        },
        getProductNames() {
        }
    },
}
</script>