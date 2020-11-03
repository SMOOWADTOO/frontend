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
                    title: "How can I order from Casafair?",
                    text: "To order from Casafair, first find a category that you want. Next, either search for a shop/product or browse our extensive list of local brands that deliver to your area. Pick a shop and look through its listing. Afterwards, select a quantity you wish to purchase. Once you are happy with your order, click on the 'Get it now' button and simply follow the checkout instructions from there. You will receive an email confirming the order."
                },
                {
                    title: "How can I pay for my order(s)?",
                    text: "You can only make payment online via the available payment methods."
                },
                {
                    title: "How much does Casafair charge for delivery?",
                    text: "Delivery charged by Casafair in Singapore depends on many operational factors, for example, locaion and the store you are ordering from. You can always check the delivery fee when you are making the payment."
                },
                {
                    title: "What are your delivery hours like?",
                    text: "Depending on your area and the local stores, we begin delivering as early as 8pm, and run as late as 8pm."
                },
                {
                    title: "Can I order for someone else?",
                    text: "Yes, definitely! During checkout, just update the name and delivery address of the person you're ordering for. Please keep in mind that if the delivery details are not correct and the delivery is unsuccessful, we won't be able to process a refund."
                },
                {
                    title: "What if I want to edit my order details, for example my delivery address?",
                    text: "You can edit your order by going to your current orders and edit it. Do note that you can only edit your order three days from your estimated delivery date as the stores need time to process your order."
                },
                {
                    title: "I have not received my order(s) yet. What happened?",
                    text: "Your estimated delivery date is in your Order Confirmation email. Alternatively, you can view your orders for the relevant details, such as the estimated delivery date. Please allow until this date for your order to arrive. If your estimated delivery date has passed and you have not received your order, please contact our Customer Care Team who can help you further."
                },
            ],
        }
    }
}
</script>