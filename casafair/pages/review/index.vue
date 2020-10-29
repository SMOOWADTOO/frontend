<template>
    <div class="columns is-centered  is-vcentered">
        <div class="column is-3">
            <figure class="image">
                <img src="https://bulma.io/images/placeholders/128x128.png">
                <p class="is-overlay mx-5 is-size-4-desktop is-size-3-touch" style="margin-top: 60%;">
                    Shop Name
                </p>
            </figure>
        </div>
        <div class="column is-1"></div>
        <div class="column is-5">
            <div class="field">
                <div class="control">
                    Title
                    <input class="input is-primary" type="text" placeholder="Please input a title">
                </div>
            </div>

            Overall Rating
            <b-rate></b-rate>

            <div class="field">
                <div class="control">
                    Comment 
                    <textarea class="textarea is-primary" placeholder="Please input a comment"></textarea>
                </div>
            </div>

            <b-field class="file is-primary" :class="{'has-name': !!file}">
                <b-upload v-model="file" class="file-label">
                    <span class="file-cta">
                        <b-icon class="file-icon" icon="upload"></b-icon>
                        <span class="file-label">Click to upload</span>
                    </span>
                    <span class="file-name" v-if="file">
                        {{ file.name }}
                    </span>
                </b-upload>
            </b-field>

            <button class="button is-medium is-fullwidth is-primary is-outlined">Submit</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                file: null
            }
        }
    }
</script>