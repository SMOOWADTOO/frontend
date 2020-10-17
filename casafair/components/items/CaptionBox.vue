<template>
    <div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">
            <div class="content">
                {{description}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        description: String,
    }
}
</script>

<style scoped>
    .card {
        border-radius: 5px;
    }

    img {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
</style>