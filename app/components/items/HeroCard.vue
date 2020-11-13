<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title">
                    {{title}}
                </h1>
                <h2 class="subtitle">
                    {{description}}
                </h2>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        title: String,
        description: String
    },

    data() {
        return {
            animated: true
        }
    },
}
</script>