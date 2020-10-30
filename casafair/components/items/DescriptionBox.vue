<template>
    <article class="tile is-child notification is-white">
        <div class="content">
            <p class="title">{{title}}</p>
            <p class="subtitle">{{description}}</p>
            <div class="content">
                <nuxt-link :to="'/storefront/' + shopID">Visit this page ></nuxt-link>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    props: {
        title: String,
        description: String,
        shopID: String,
    }
}
</script>