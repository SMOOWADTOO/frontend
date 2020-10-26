<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                     class="mr-2" src="@/assets/images/casafair_logo.png" alt="Casafair's logo"
                >
            </b-navbar-item>
        </template>
        <template slot="end">
            <b-navbar-item tag="router-link" :to="{path: '/' + urlSafe(pill0)}">
                {{pill0}}
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{path: '/' + urlSafe(pill1)}">
                {{pill1}}
            </b-navbar-item>
            <b-navbar-item  tag="router-link" :to="{path: '/login', query: {'redirect_from': this.$nuxt.$route.path}}" v-if="!$auth.loggedIn">
                {{pill2}}
            </b-navbar-item>
            <b-navbar-item tag="div" v-if="!$auth.loggedIn">
                <button class="button is-primary signature-dark-purple-shadows" v-on:click="goRegister">{{pill3}}</button>
            </b-navbar-item>
            
            <b-navbar-dropdown :label="'Hey, ' + this.$auth.user.user.firstName + '!'" v-else>
                <b-navbar-item tag="router-link" :to="{path: '/user/profile/' + this.$auth.user.user.id}">
                    My Profile
                </b-navbar-item>
                <b-navbar-item tag="router-link" :to="{path: '/user/settings'}">
                    Account Settings
                </b-navbar-item>
                <b-navbar-item v-on:click="logout">
                    Log out
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
    </b-navbar>
</template>

<script>
export default {
    props: {
        pill0: String,
        pill1: String,
        pill2: String,
        pill3: String,
    },
    methods: {
        goRegister() {
            this.$router.push("/register")
        },
        logout() {
            this.$auth.logout()
            this.toastAlert("You've logged out.", "is-info", 5000)
        },
        urlSafe(link) {
            return link.toLowerCase().replace(" ", "-");
        }
    },
    data() {
        return {
        }
    },
}
</script>

<style scoped>
    @media screen and (min-width: 1024px) {
        img {
            max-height:3rem;
        }
        nav {
            padding: 0 3rem;
        }
    }
</style>