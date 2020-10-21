<template>
    <div class="box">
        <article class="media">
            <div class="media-left">
                <figure class="image is-100x100">
                    <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                </figure>
            </div>
            <div class="media-content is-vcentered">
                <div class="content">
                    <p>
                        <strong>{{rData.name}}</strong> <small>@johnsmith</small> <small>31m</small>
                        <br>
                        {{rData.review}}
                    </p>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    props: {
        rData: Object,
    }
}
</script>