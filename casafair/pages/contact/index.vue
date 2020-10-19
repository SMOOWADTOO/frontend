<template>
    <section>
        <StaticPageHeader :heroClass="'has-text-centered'" :title="pageName" :description="pageDescription"/>
        <div class="columns my-5">
            <div class="column is-6 is-offset-3">
                <p class="title has-text-centered">Helpful topics</p>
                <br>
                <nav class="level my-5 px-5">
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Grievances</p>
                            <b-icon
                                icon="account"
                                size="is-large"
                                type="is-primary">
                            </b-icon>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Claims</p>
                            <b-icon
                                icon="account"
                                size="is-large"
                                type="is-primary">
                            </b-icon>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Feedback</p>
                            <b-icon
                                icon="account"
                                size="is-large"
                                type="is-primary">
                            </b-icon>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <hr>
        <div class="columns my-5">
            <div class="column is-6 is-offset-3">
                <div class="columns is-multiline mx-3">
                    <div class="column is-6">
                        <b-icon
                            icon="account"
                            size="is-large"
                            type="is-primary">
                        </b-icon>
                        <p>Lorem Ipsum ist ein einfacher Demo-Text für die Print- und Schriftindustrie.</p>
                    </div>
                    <div class="column is-6">
                        <b-icon
                            icon="account"
                            size="is-large"
                            type="is-primary">
                        </b-icon>
                        <p>Lorem Ipsum ist ein einfacher Demo-Text für die Print- und Schriftindustrie.</p>
                    </div>
                    <div class="column is-6">
                        <b-icon
                            icon="account"
                            size="is-large"
                            type="is-primary">
                        </b-icon>
                        <p>Lorem Ipsum ist ein einfacher Demo-Text für die Print- und Schriftindustrie.</p>
                    </div>
                    <div class="column is-6">
                        <b-icon
                            icon="account"
                            size="is-large"
                            type="is-primary">
                        </b-icon>
                        <p>Lorem Ipsum ist ein einfacher Demo-Text für die Print- und Schriftindustrie.</p>
                    </div>
                </div>
            </div>
        </div>
        <hr>
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
            pageName: "Contact Us",
            pageDescription: "Need any help? Let us know.",
        }
    }
}
</script>