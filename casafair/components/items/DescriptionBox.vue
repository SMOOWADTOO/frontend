<template>
    <article class="tile is-child notification is-white py-5">
        <div class="content py-6">
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