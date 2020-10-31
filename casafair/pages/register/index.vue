<template>
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container hero-container">
                <form v-on:submit.prevent="validateBeforeSubmit">
                    <div class="columns input-group">
                        <div class="column is-8 is-offset-2">
                            <h1 class="hero-title is-size-1 is-size-3-touch has-text-signature has-text-centered-desktop">
                                Sign up
                            </h1>
                            <br>
                            <p class="">
                                Please register your new user information
                            </p>
                            <br>
                            <b-field label="Your email" :type="uiLabels.email">
                                <b-input custom-class="has-background-input" v-model="email" type="email" placeholder="john@homebiz.co" class="borderless" expanded required v-on:blur="checkEmail"></b-input>
                            </b-field>
                            
                            <b-field label="Your password" :type="uiLabels.password">
                                <b-input custom-class="has-background-input" v-model="password" type="password" placeholder="password" class="borderless" expanded required password-reveal v-on:blur="checkPassword"></b-input>
                            </b-field>

                            <small class="is-italic">Your password has to be at least 8 characters, and contains an uppercase letter and a numeric digit</small><br><br>

                            <b-field label="Type your password again" :type="uiLabels.cPassword">
                                <b-input custom-class="has-background-input" v-model="cPassword" type="password" placeholder="password" class="borderless" expanded required password-reveal v-on:blur="checkIsSamePassword"></b-input>
                            </b-field>

                            <b-field label="Your username" :type="uiLabels.username">
                                <b-input custom-class="has-background-input" v-model="username" maxlength="16" type="text" placeholder="timapple123" class="borderless" expanded required v-on:blur="checkUsername"></b-input>
                            </b-field>

                            <b-field label="Your first name">
                                <b-input custom-class="has-background-input" v-model="fName" type="text" placeholder="Min Tao, Ayesha, Nikhil, Sophia..." class="borderless" expanded required></b-input>
                            </b-field>

                            <b-field label="Your last name">
                                <b-input custom-class="has-background-input" v-model="lName" type="text" placeholder="Lee, Osman, Chaudhry, Smith..." class="borderless" expanded required></b-input>
                            </b-field>

                            <b-field label="Account Type">
                                <b-select v-model="accountType" placeholder="Select your account type">
                                    <option value="normal_user">I'm a normal user!</option>
                                    <option value="business_admin">I own a business</option>
                                </b-select>
                            </b-field>

                            <button class="button is-primary signature-dark-purple-shadows my-3" type="submit" :disabled="emailErrors || pwErrors || cPwErrors || this.fName === '' || this.lName === ''">Register</button>
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
            pageName: "Register with us",
            pageDescription: "Sign up with us today – Singapore\'s only platform for home businesses",
            email: "",
            username: "",
            password: "",
            cPassword: "",
            fName: "",
            lName: "",
            accountType: "normal_user",

            emailErrors: true,
            pwErrors: true,
            cPwErrors: true,
            usernameErrors: true,

            // UI colour labels
            uiLabels: {
                username: "",
                email: "",
                password: "",
                cPassword: "",
                fName: "",
                lName: "",
            }
        }
    },
    mounted() {
        if (this.$auth.loggedIn) {
            this.$router.push("/")
        }
    },
    methods: {
        validateBeforeSubmit() {
            
            if (!this.emailErrors && !this.pwErrors && !this.cPwErrors) {
                
                let r = this.$axios.post(this.USERAPI + "/" + this.accountType, {
                    "username": this.username,
                    "email": this.email,
                    "password": this.password,
                    "firstName": this.fName,
                    "lastName": this.lName
                }).then((newUserResponse) => {
                    var response = newUserResponse.data
                    var fetchType = response.type
                    if (fetchType == "success") {
                        this.$router.push("/user/settings")
                        this.login()
                    } else {
                        this.toastAlert(response.message, "is-danger", 5000)
                    }
                }).catch((error) => {
                    
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert(response.message, "is-danger", 5000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })
            } else {
                this.snackbarAlert("You have errors on your form", "is-danger", 5000)
            }
        },
        checkEmail() {
            if (this.email != "") {
                let r = this.$axios.get(this.USERAPI + "/check/" + this.email).then((userResponse) => {

                    if (userResponse.data.type == "success") {
                        this.emailErrors = true
                        this.snackbarAlert("Email exists. Please login instead.", "is-danger", 5000)
                        this.uiLabels.email = "is-danger"
                    } else {
                        this.emailErrors = false
                        this.uiLabels.email = "is-success"
                    }
                }).catch((error) => {
                    if (error.response.status == 404) {
                        this.emailErrors = false
                        this.uiLabels.email = "is-success"
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })
            } else {
                this.emailErrors = true
                this.uiLabels.emailErrors = "is-danger"
            }
        },
        checkUsername() {
            if (this.username != "") {
                let r = this.$axios.get(this.USERAPI + "/check/username/" + this.username).then((userResponse) => {

                    if (userResponse.data.type == "success") {
                        this.usernameErrors = true
                        this.snackbarAlert("Username exists. Please choose another username.", "is-danger", 5000)
                        this.uiLabels.username = "is-danger"
                    } else {
                        this.usernameErrors = false
                        this.uiLabels.username = "is-success"
                    }
                }).catch((error) => {
                    if (error.response.status == 404) {
                        this.usernameErrors = false
                        this.uiLabels.username = "is-success"
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })
            } else {
                this.usernameErrors = true
                this.uiLabels.username = "is-danger"
            }
        },
        checkPassword() { 
            if (this.password != "") {
                var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
                if (this.password.match(passw)) {
                    this.pwErrors = false
                    this.uiLabels.password = "is-success"
                }
                else { 
                    this.snackbarAlert('Your password has to be at least 8 characters, and contains an uppercase letter and a numeric digit', "is-danger", 5000)
                    this.pwErrors = true
                    this.uiLabels.password = "is-danger"
                }
            }
        },
        checkIsSamePassword() {
            if (this.cPassword == "" || this.password != this.cPassword ) {
                this.cPwErrors = true
                this.snackbarAlert("Password doesn't match", "is-danger", 10000)
                this.uiLabels.cPassword = "is-danger"
            } else {
                this.cPwErrors = false
                this.uiLabels.cPassword = "is-success"
            }
        },
        login() {
            this.$auth.loginWith('local', { data: {
                    "username": this.username,
                    "email": this.email,
                    "password": this.password
                }
            }).then((userResponse) => {
                let authenticatedUser = this.$auth.user.user
                this.toastAlert("Welcome to " + this.appName + ", " + authenticatedUser.firstName + "!", "is-success", 5000)
                // this.$router.push("/user/settings")
                this.$router.push("/")
            }).catch((error) => {
                if (error.response != undefined) {
                    var response = error.response.data
                    this.toastAlert(response.message, "is-danger", 5000)
                } else {
                    this.toastAlert(error, "is-danger", 5000)
                }
            })
        },
    },
}
</script>

<style scoped>
</style>