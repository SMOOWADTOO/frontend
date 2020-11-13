<template>
    <section>
        <section class="hero">
            <div :class="'hero-body ' + heroClass">
                <div class="container px-6">
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
        heroClass: String,
    }
}
</script>