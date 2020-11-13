<template>
    <div class="container-fluid" style="min-height: 100vh;">
        <!-- 4 buttons in nav, write each description here -->
        <navbar pill0="About Us" pill1="FAQ" pill2="Contact Us" pill3="Log in" pill4="Sign up"/>
        <nuxt/>
        <bottom/>
    </div>
    
</template>

<script>
import navbar from '@/components/layouts/Navbar.vue'
import bottom from '@/components/layouts/Bottom.vue'

export default {
    head: {
        link: [
            { rel: 'stylesheet', href: 'https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css' },
        ],
    },
    data () {
        return {
            mobile: false,
        }
    },
    components: {
        navbar,
        bottom,
    },
}
</script>

<style lang="scss">
    @import '~assets/styles/main.scss';
</style>

<style>
    img {
        object-fit: cover;
    }
    .sticky-box {
        top: 5vh !important;
        z-index: 0;
    }

    .sticky-top {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 29;
    }
</style>