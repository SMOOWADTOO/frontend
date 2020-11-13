<template>
    <div class="card" style="margin: 3rem 0;">
        <div class="columns">
            <div class="column">
                <div class="card-image">
                    <figure class="image is-4by3 has-background-grey-lighter">
                    </figure>
                </div>
            </div>
            <div class="column">
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <b-skeleton width="100%" :animated="animated" ></b-skeleton>
                            <b-skeleton width="100%" :animated="animated" ></b-skeleton>
                        </div>
                    </div>

                    <div class="content">
                        <b-skeleton width="100%" :animated="animated" ></b-skeleton>
                        <b-skeleton width="100%" :animated="animated" ></b-skeleton>
                        <b-skeleton width="100%" :animated="animated" ></b-skeleton>
                        <b-skeleton width="100%" :animated="animated" ></b-skeleton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            animated: true
        }
    },
}
</script>