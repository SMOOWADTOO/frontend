<template>
    <section class="page-content">
        <StaticPageHeader :heroClass="'has-text-centered'" :title="pageName" :description="pageDescription" />
        <!-- contact form -->
        <div class="field">
            <div class="columns">
                <div class="column is-6 is-offset-3">
                    <div class="control">
                        <input class="input" type="text" v-model="name" placeholder="Name">
                    </div>
                </div>
            </div>
        </div>
        <div class="field">
            <div class="columns">
                <div class="column is-6 is-offset-3">
                    <div class="control">
                        <input class="input" type="email" v-model="email" placeholder="Email">
                    </div>
                </div>
            </div>
        </div>
        <div class="field">
            <div class="columns">
                <div class="column is-6 is-offset-3">
                    <div class="control">
                        <input class="input" type="text" v-model="subject" placeholder="Subject">
                    </div>
                </div>
            </div>
        </div>
        <div class="field">
            <div class="columns">
                <div class="column is-6 is-offset-3">
                    <textarea class="textarea" v-model="description" placeholder="Description"></textarea>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-6 is-offset-3">
                <div class="field is-grouped is-grouped-right">
                    <p class="control">
                        <a class="button is-primary" v-on:click="sendContactUsEmail()">
                            Submit
                        </a>
                    </p>
                    <p class="control">
                        <a class="button is-light" v-on:click="cancelContent()">
                            Cancel
                        </a>
                    </p>
                </div>
            </div>
        </div>

        <hr>
    </section>
</template>

<script>
    export default {
        head() {
            return {
                title: this.appName + " | " + this.pageName,
                meta: [
                    // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                    {
                        hid: 'description',
                        name: 'description',
                        content: this.pageDescription
                    }
                ]
            }
        },
        data() {
            return {
                pageName: "Contact Us",
                pageDescription: "Need any help? Let us know.",
                name: "",
                subject: "",
                email: "",
                description: "",
            }
        },
        methods: {
            sendContactUsEmail() {
                // Create message object
                var message = {
                    name: this.name,
                    email: this.email,
                    subject: this.subject,
                    description: this.description
                }
                console.log(message)
                // Call API (/notification/contact-us)
                let r = this.$axios.post(this.NOTIFICATIONAPI + "/contact-us", message).then((response) => {
                    let respData = response.data
                    console.log(respData)
                    this.toastAlert(respData.message, "is-success", 5000)
                }).catch((error) => {
                    if (error.response != undefined) {
                        var response = error.response.data
                        this.toastAlert(response.message, "is-danger", 5000)
                    } else {
                        this.toastAlert(error, "is-danger", 5000)
                    }
                })

            },
            cancelContent() {
                this.name = "",
                this.subject = "",
                this.email = "",
                this.description = ""
            }
        }
    }
</script>