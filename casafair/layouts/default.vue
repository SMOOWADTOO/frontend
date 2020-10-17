<template>
    <div class="container-fluid" style="min-height: 100vh;">
        <!-- 4 buttons in nav, write each description here -->
        <navbar pill0="About" pill1="Shopping cart" pill2="Log in" pill3="Sign up"/>
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