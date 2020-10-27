<template>
    <section>
        <!-- <StaticPageHeader :heroClass="'has-text-centered'" :title="pageName" :description="pageDescription"/> -->
          <!-- Hero content: will be in the middle -->
        <section class="hero has-background-primary-light">
            <div class="hero-body">
                <div class="container has-text-centered"  id="trigger">
                    <div class="columns">
                        <div class="column is-6 is-offset-3">
                            <figure class="image is-30x30">
                                <img src="@/assets/images/business_shop.svg" alt="Image"  id="img-1">
                            </figure>
                        </div>
                    </div>
                    <h1 class="title" id="title-1">
                        First, there was COVID-19.
                    </h1>
                    <h2 class="subtitle" id="subtitle-1">
                        Then, people were confined in their homes. How do we keep the spirit of home businesses alive?
                    </h2>
                </div>
            </div>
        </section>
        <div class="columns is-3 my-5 is-vcentered is-centered">
            <div class="column is-5">
                <div class="title">With Casafair, you're the boss.</div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum
                </p>

            </div>
            <div class="column is-1"></div>
            <div class="column is-5">
                <figure class="image is-60x60">
                    <img src="@/assets/images/youretheboss.svg" alt="Image">
                </figure>
            </div>
            


        </div>

        <!-- </div> -->

        <div class="columns is-8 my-5 is-vcentered is-centered">
            <div class="column is-5">
                <figure class="image is-60x60">
                    <img src="@/assets/images/wallet.svg" alt="Image">
                </figure>
            </div>
            <div class="column is-1"></div>

            <div class="column is-5">
                <div class="title">The entrepreneur is in you.</div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum
                </p>

            </div>


        </div>

        <div class="columns is-3 my-5 is-vcentered is-centered">
            <div class="column is-5">
                <div class="title">Payments with ease. No fees.</div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum
                </p>

            </div>
            <div class="column is-1"></div>
            <div class="column is-5">
                <figure class="image is-60x60">
                    <img src="@/assets/images/payment.svg" alt="Image">
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
            pageDescription: "Why did we start Casafair?",
        }
    },
    mounted() {
        this.startAnimation()
    },
    methods: {
        startAnimation() {
            
        },
    }
}
</script>