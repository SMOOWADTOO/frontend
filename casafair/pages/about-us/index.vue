<template>
    <section>
        <StaticPageHeader :heroClass="'has-text-centered'" :title="pageName" :description="pageDescription"/>
    </section>
</template>

<script>
export default {
    head () {
        return {
            title: this.appName + " | " + this.pageName,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: this.pageDescription }
            ]
        }
    },
    data() {
        return {
            pageName: "About Us",
            pageDescription: "Why did we start Casafair?",
        }
    }
}
</script>