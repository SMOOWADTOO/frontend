<template>
    <section>
        <section class="hero">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    {{title}}
                </h1>
                <h2 class="subtitle">
                    {{description}}
                </h2>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
export default {
    props: {
        title: String,
        description: String,
    }
}
</script>