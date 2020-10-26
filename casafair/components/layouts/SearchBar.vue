<template>
    <form v-on:submit.prevent="validateBeforeSubmit">
        <div class="columns input-group px-5">
            <div class="column is-1">
                <div class="field">
                    <small>Search</small>
                    <b-switch v-model="isShopSwitch"
                        :rounded="false"
                        type="is-danger"
                        true-value="Shop"
                        false-value="Product">
                    </b-switch>
                    <small>{{ isShopSwitch.toLowerCase() }}</small>
                </div>
            </div>
            <div class="column is-10">
                <b-field :label="isShopSwitch.toLowerCase() + ' search'" v-if="isShopSwitch == 'Product'">
                    <b-autocomplete
                        v-model="product"
                        :data="filteredCarArray"
                        placeholder="Try &quot;Brownies&quot;, &quot;Curry Puff&quot;..."
                        icon="magnify"
                        clearable
                        required>
                        <template slot="empty">No results found</template>
                    </b-autocomplete>
                </b-field>
                <b-field :label="isShopSwitch.toLowerCase() + ' search'" v-if="isShopSwitch == 'Shop'">
                    <b-autocomplete
                        v-model="shop"
                        :data="filteredDataArray"
                        placeholder="Try &quot;The Sunshine Shop&quot;, &quot;Rudy's bakes&quot;..."
                        icon="magnify"
                        clearable
                        required>
                        <template slot="empty">No results found</template>
                    </b-autocomplete>
                </b-field>
            </div>
            <div class="column is-1">
                <b-field grouped style="min-width:100%; min-height:100%;">
                    <p class="control" style="min-width:100%; min-height:100%;">
                        <button class="button is-primary" style="min-width:100%; min-height:100%;" type="submit" :disabled="!valid">Search</button>
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