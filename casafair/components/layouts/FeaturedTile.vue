<template>
    <div class="columns my-5">
        <div class="column">
            <DescriptionBox :title="title" :description="description"/>
        </div>
        <div class="column is-4">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <!-- owner description -->
                    <CaptionBox description="Business Owner's description"/>
                </div>
            </div>
        </div>
        <div class="column is-4 is-hidden-touch">
            <div class="columns is-multiline">
                <!-- iterate through product list of this featured business -->
                <div class="column is-6">
                    <CaptionBox description="Product 0"/>
                </div>
                <div class="column is-6">
                    <CaptionBox description="1"/>
                </div>
                <div class="column is-6">
                    <CaptionBox description="2"/>
                </div>
                <div class="column is-6">
                    <CaptionBox description="3"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: "Le Business Name",
            description: "Lorem ipsum dolor sit amet consectur adispiscing"
        }
    }
}
</script>