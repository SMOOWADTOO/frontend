<template>
    <section>
        <div class="columns is-centered is-vcentered">
            <div class="column is-6">
                <ProductForm ref="productForm" :productID="this.$route.params.id"/>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        mounted() {
            this.$refs.productForm.fetchInfo()
        }
    }
</script>