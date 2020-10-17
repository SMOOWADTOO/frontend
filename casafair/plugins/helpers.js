import Vue from 'vue'

Vue.mixin({
    data() {
        return {
            // Put all global variables here
            appName: "Casafair",
            appSlogan: "Anyone can do business. From home.",
            appDescription: "Casafair is the first platform to connect home businesses with Singaporeans. It makes transactions easy, frictionless and fast."
        }
    },
    methods: {
        snackbarAlert(message, type, duration) {
            this.$buefy.snackbar.open({
                duration: duration,
                message: message,
                type: type,
                position: 'is-bottom-left',
                actionText: 'x',
                queue: false,
            })
        },
        toastAlert(message, type, duration) {
            this.$buefy.toast.open({
                duration: duration,
                message: message,
                type: type,
                queue: false,
            })
        },
    }
})