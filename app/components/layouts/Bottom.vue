<template>
    <footer class="footer">
        <div class="content has-text-centered">
            <div class="columns">
                <div class="column">
                    <small>
                        <strong>© {{ new Date().getFullYear() }} {{appName}}</strong> | {{appSlogan}}
                    </small>
                </div>
                <div class="column">
                    <div class="columns is-mobile">
                        <div class="column is-4 is-2-touch">
                            <small class="is-hidden-touch">| Get in touch with us:</small>
                        </div>
                        <div class="column has-text-centered is-1">
                            <a href="https://www.facebook.com/" target="_blank"><i class="lab la-facebook-f"></i></a>
                        </div>
                        <div class="column has-text-centered is-1">
                            <a href="https://www.instagram.com/" target="_blank"><i class="lab la-instagram"></i></a>
                        </div>
                        <div class="column has-text-centered is-1">
                            <a href="https://twitter.com/" target="_blank"><i class="lab la-twitter"></i></a>
                        </div>
                        <div class="column has-text-centered is-1">
                            <a href="https://www.linkedin.com/" target="_blank"><i class="lab la-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
    footer {
        padding: 3rem 1.5rem !important;
    }

    @media screen and (max-width: 768px) {
        footer {
            padding: 0 1.5rem !important;
        }
    }
</style>

<script>
export default {
    head: {
    },
}
</script>