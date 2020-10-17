<template>
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container hero-container">
                <form v-on:submit.prevent="login">
                    <div class="columns input-group">
                        <div class="column is-6 is-offset-3 is-12-mobile">
                            <h1 class="hero-title is-size-1 is-size-3-touch has-text-signature has-text-centered-desktop">
                                Welcome back.
                            </h1>
                            <br>
                            <p class="">
                                Please login to continue
                            </p>
                            <br>
                            <b-field label="Your email">
                                <b-input custom-class="has-background-input" v-model="email" type="email" placeholder="john@homebiz.co" class="borderless" expanded required></b-input>
                            </b-field>
                            
                            <b-field label="Your password">
                                <b-input custom-class="has-background-input" v-model="password" type="password" placeholder="password" class="borderless" required password-reveal></b-input>
                            </b-field>
                            <br>
                            <button class="button is-primary is-light signature-dark-purple-shadows my-5 is-fullwidth" type="submit">Log in</button>
                            <hr>
                            <button class="button is-primary signature-dark-purple-shadows my-5 is-fullwidth" type="submit">Register</button>
                        </div>
                    </div>
                </form>
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
            pageName: "Login",
            pageDescription: "Welcome! Please sign in.",

            email: "",
            password: "",

            // loading spinner
            isLoading: false,
            isFullPage: true,
        }
    },
    mounted() {
    },
    methods: {
        login() {
            this.$auth.loginWith('local', { data: {
                    "email": this.email,
                    "password": this.password
                }
            }).then((userResponse) => {
                let user = this.$auth.user.user
                this.toastAlert("Welcome back, " + user.firstName + "!", "is-success", 5000)

                // redirects you back to where you came from
                if (this.$nuxt.$route.query.redirect_from != undefined) {
                    this.$router.push(this.$nuxt.$route.query.redirect_from)
                } else {
                    this.$router.push("/")
                }

            }).catch((error) => {
                if (error.response != undefined) {
                    var response = error.response.data
                    this.toastAlert(response.message, "is-danger", 5000)
                } else {
                    this.toastAlert(error, "is-danger", 5000)
                }
            })
        },
    }
}
</script>