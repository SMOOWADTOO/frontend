<template>
    <div class="box">
        <figure class="image is-128x128">
            <img src="https://bulma.io/images/placeholders/128x128.png">
        </figure>
        <div class="description">
            {{description}}
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