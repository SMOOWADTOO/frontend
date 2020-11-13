<template>
    <section>
        <!-- <StaticPageHeader :heroClass="'has-text-centered'" :title="pageName" :description="pageDescription"/> -->
          <!-- Hero content: will be in the middle -->
        <section class="hero has-background-primary-light page-content">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="mt-5 title trigger-1" id="title-1">
                        First, there was COVID-19.
                    </h1>
                    <div class="columns my-5">
                        <div class="column is-6 is-offset-3">
                            <figure class="image is-30x30 trigger-2">
                                <img style="max-height: 50vh; object-fit:contain;" src="@/assets/images/business_shop.svg" alt="Image">
                            </figure>
                        </div>
                    </div>
                    <h2 class="title trigger-2 my-5" id="subtitle-1">
                        Then, people were confined to their homes.<br>How do we keep the spirit of home businesses alive?
                    </h2>
                    <div style="height:30vh"></div>
                </div>
            </div>
        </section>
        <div class="columns is-3 my-5 is-vcentered is-centered">
            <div class="column is-5 trigger-3">
                <div class="title">With Casafair, you're in charge.</div>
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
                <figure class="image is-60x60 trigger-4">
                    <img src="@/assets/images/youretheboss.svg" alt="Image">
                </figure>
            </div>
            


        </div>

        <!-- </div> -->

        <div class="columns is-8 my-5 is-vcentered is-centered">
            <div class="column is-5">
                <figure class="image is-60x60 trigger-5">
                    <img src="@/assets/images/wallet.svg" alt="Image">
                </figure>
            </div>
            <div class="column is-1"></div>

            <div class="column is-5 trigger-6">
                <div class="title">We help you reach greater heights.</div>
                <p>
                    Casafair believes in the transformative power of technology and want to change the world for the better by opening up opportunities for all, regardless of background or ability,
                     especially during this poor economic outlook.
                    <br>
                    <br>
                    Casafair is committed to providing a one-stop online platform for home businesses to sell their products with ease and from the comfort of their own homes, as well as for
                    potential customers to have a one-stop platform to shop various local brands conveniently.
                </p>

            </div>


        </div>

        <div style="height: 50vh;"></div>

        <div class="columns is-3 my-5 is-vcentered is-centered">
            <div class="column is-5 trigger-7">
                <div class="title">Payments with ease. No fees.</div>
                <p>
                    In Casafair, payment is made easy. Just pay it online with the available payment methods. The best part is 
                    that there is no additional cost!
                </p>

            </div>
            <div class="column is-1"></div>
            <div class="column is-5">
                <figure class="image is-60x60 trigger-8">
                    <img src="@/assets/images/payment.svg" alt="Image">
                </figure>
            </div>


        </div>

        <div style="height: 50vh;"></div>
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
        // Code vanilla JS here guys
        if (process.client) { 
            this.startAnimation()
        }
    },
    methods: {
        startAnimation() {
            this.$gsap.registerPlugin(this.$scrollTrigger)
                let t1 = this.$gsap.timeline({
                    // yes, we can add it to an entire timeline!
                    scrollTrigger: {
                        trigger: ".trigger-1",
                        pin: true,   // pin the trigger element while active
                        start: "+=0", // when the top of the trigger hits the top of the viewport
                        end: "+=400", // end after scrolling 500px beyond the start
                        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                    }
                }).from(".trigger-1", {y: 280})

                let t2 = this.$gsap.timeline({
                    scrollTrigger: {
                        trigger: ".trigger-2",
                        pin: true,   // pin the trigger element while active
                        start: "-=100", // when the top of the trigger hits the top of the viewport
                        end: "+=250", // end after scrolling 500px beyond the start
                        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                    }
                }).from(".trigger-2", {scale: 0.3, autoAlpha: 0})

                let t3 = this.$gsap.timeline({
                    scrollTrigger: {
                        trigger: ".trigger-3",
                        pin: true,   // pin the trigger element while active
                        start: "-=400", // when the top of the trigger hits the top of the viewport
                        end: "+=0", // end after scrolling 500px beyond the start
                        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                    }
                }).from(".trigger-3", {x: -800})

                let t4 = this.$gsap.timeline({
                    scrollTrigger: {
                        trigger: ".trigger-4",
                        pin: true,   // pin the trigger element while active
                        start: "-=200", // when the top of the trigger hits the top of the viewport
                        end: "+=200", // end after scrolling 500px beyond the start
                        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                    }
                }).from(".trigger-4", {x: 800})

                let t5 = this.$gsap.timeline({
                    scrollTrigger: {
                        trigger: ".trigger-5",
                        pin: true,   // pin the trigger element while active
                        start: "-=400", // when the top of the trigger hits the top of the viewport
                        end: "+=500", // end after scrolling 500px beyond the start
                        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                    }
                }).from(".trigger-5", {scale: 0.4, autoAlpha:0})

                let t6 = this.$gsap.timeline({
                    scrollTrigger: {
                        trigger: ".trigger-6",
                        pin: true,   // pin the trigger element while active
                        start: "-=400", // when the top of the trigger hits the top of the viewport
                        end: "+=300", // end after scrolling 500px beyond the start
                        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                    }
                }).from(".trigger-6", {autoAlpha: 0})

                let t7 = this.$gsap.timeline({
                    scrollTrigger: {
                        trigger: ".trigger-7",
                        pin: true,   // pin the trigger element while active
                        start: "-=400", // when the top of the trigger hits the top of the viewport
                        end: "+=00", // end after scrolling 500px beyond the start
                        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                    }
                }).from(".trigger-7", {x: -800})

                let t8 = this.$gsap.timeline({
                    scrollTrigger: {
                        trigger: ".trigger-8",
                        pin: true,   // pin the trigger element while active
                        start: "-=400", // when the top of the trigger hits the top of the viewport
                        end: "+=00", // end after scrolling 500px beyond the start
                        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                    }
                }).from(".trigger-8", {x: 800})
        },
    }
}
</script>