<template>
    <section class="page-content">
        <StaticPageHeader :title="pageName" :description="pageDescription"/>
        <div class="columns my-5 mx-5">
            <div class="column is-8 is-offset-2">
                <section>
                    <b-collapse
                        class="card"
                        animation="slide"
                        v-for="(collapse, index) of collapses"
                        :key="index"
                        :open="isOpen == index"
                        @open="isOpen = index">
                        <div
                            slot="trigger"
                            slot-scope="props"
                            class="card-header"
                            role="button">
                            <p class="card-header-title">
                                {{ collapse.title }}
                            </p>
                            <a class="card-header-icon">
                                <b-icon
                                    :icon="props.open ? 'menu-up' : 'menu-down'">
                                </b-icon>
                            </a>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                {{ collapse.text }}
                            </div>
                        </div>
                    </b-collapse>
                </section>
            </div>
        </div>
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
            pageName: "FAQs",
            pageDescription: "Answering all frequently asked questions",

            // Edit FAQ text here
            isOpen: 0,
            collapses: [
                {
                    title: "What happens if the business owner screws me over?",
                    text: "Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken."
                },
                {
                    title: "What if s--- happens?",
                    text: "Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken."
                },
                {
                    title: "Who am I?",
                    text: "Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken."
                },
            ],
        }
    }
}
</script>