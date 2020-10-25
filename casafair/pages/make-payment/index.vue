<template>
    <section>
        <div class="columns is-centered">
            <div class="column is-10 is-12-mobile is-centered">
                <div class="title has-text-centered">Shopping Cart</div>
                <hr>

                <OrderCard v-for="i of reviewData" v-bind:key="i.name" :rData="i" />
            </div>
        </div>


        <div class="columns is-centered">
            <div class="column is-5">
                <h6 class="title is-6">Delivery Address:</h6>
            </div>
            <div class="column is-5">
                <h6 class="subtitle is-6">Blk 123 Berseh #12-100 S(2123456)</h6>
            </div>
        </div>

        <div class="columns is-centered">
            <div class="column is-5">
                <h6 class="title is-6">Shipping Fees:</h6>
            </div>
            <div class="column is-5">
                <h6 class="title is-6">$4.00</h6>
            </div>
        </div>

        <div class="columns">
            <div class="column is-10">
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Promo Code: </label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control">
                                <input class="input" type="email" placeholder="Recipient email">
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="columns is-centered">
            <div class="column is-10">
                <div class="field">
                    <div class="control">
                        <div class="select is-medium is-fullwidth">
                            <select>
                                <option>Payment</option>
                                <option>With options</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="columns is-centered">
            <div class="column is-1">
                <div class="title is-6">Total: $130.50</div>
            </div>
            <div class="column is-8"></div>
            <div class="column is-1">
                <button class="button is-primary is-outlined">Place Order</button>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                reviewData: [{
                    "name": "sadofijsdf",
                    "review": "BAD"
                }, {
                    "name": "lorem ipsum",
                    "review": "give my money bacl"
                }]
            }
        },
        methods: {
            random() {
                return Math.floor(Math.random() * (10 - 1 + 1)) + 10;
            }
        }
    }
</script>