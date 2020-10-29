<template>
    <section>
        <!-- <StaticPageHeader :heroClass="'has-text-centered'" :title="pageName" :description="pageDescription"/> -->
          <!-- Hero content: will be in the middle -->
        <section class="hero has-background-primary-light">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="mt-5 title trigger-1" id="title-1">
                        First, there was COVID-19.
                    </h1>
                    <div class="columns my-5">
                        <div class="column is-6 is-offset-3">
                            <figure class="image is-30x30 trigger-2">
                                <img style="max-height: 50vh;" src="@/assets/images/business_shop.svg" alt="Image">
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
                <figure class="image is-60x60 trigger-4">
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
        // Code vanilla JS here guys
        if (process.client) { 
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
                        end: "+=300", // end after scrolling 500px beyond the start
                        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                    }
                }).from(".trigger-4", {x: 800})
            }
    },
    methods: {
        startAnimation() {
            
        },
    }
}
</script>