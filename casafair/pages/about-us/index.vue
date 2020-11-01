<template>
    <section>
        <StaticPageHeader :heroClass="'has-text-centered'" :title="pageName" :description="pageDescription"/>
                <div class="columns is-3 my-5 is-vcentered is-centered">
            <div class="column is-5">
                <div class="title">Why did we start Casafair?</div>
                <p>
                    During the COVID-19 pandemic, which affected the entire world, unemployment in many countries, including Singapore, was on the rise.
                    With more people forced to stay at home, this gave rise to a number of small home businesses. Many of these home businesses have to
                    start from scratch and establish their own platforms with the help of their own social media platforms. Thus, many tasks are manual, 
                    from having to liaise with customers on the product information to scheduling delivery dates. Therefore, Casafair believes that home
                    businesses' efficiency and productivity could be improved by providing a platform for home businesses to sell their products.
                </p>

            </div>
            <div class="column is-1"></div>
            <div class="column is-5">
                <figure class="image is-60x60">
                    <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                </figure>
            </div>
            


        </div>

        <!-- </div> -->

        <div class="columns is-8 my-5 is-vcentered is-centered">
            <div class="column is-5">
                <figure class="image is-60x60">
                    <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                </figure>
            </div>
            <div class="column is-1"></div>

            <div class="column is-5">
                <div class="title">Our Mission</div>
                <p>
                    Casafair is committed to providing a one-stop online platform for home businesses to sell their products with ease and from the comfort of their own homes, as well as for
                    potential customers to have a one-stop platform to shop various local brands conveniently.
                </p>

            </div>


        </div>

        <div class="columns is-3 my-5 is-vcentered is-centered">
            <div class="column is-5">
                <div class="title">Our Vission</div>
                <p>
                    Casafair believes in the transformative power of technology and want to change the world for the better by opening up opportunities for all, regardless of background or ability, especially during this poor economic outlook.
                </p>

            </div>
            <div class="column is-1"></div>
            <div class="column is-5">
                <figure class="image is-60x60">
                    <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                </figure>
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
            pageName: "About Us",
            pageDescription: "All about Casafair",
        }
    }
}
</script>