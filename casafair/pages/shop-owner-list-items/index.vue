<template>
    <section>
        <br>
        <div class="columns is-centered is-vcentered">
            <b-field>
                <b-upload v-model="dropFiles"
                    multiple
                    drag-drop>
                    <section class="section">
                        <div class="content has-text-centered">
                            <p>
                                <b-icon
                                    icon="upload"
                                    size="is-large">
                                </b-icon>
                            </p>
                            <p>Drop your files here or click to upload</p>
                        </div>
                    </section>
                </b-upload>
            </b-field>

            <div class="tags">
                <span v-for="(file, index) in dropFiles"
                    :key="index"
                    class="tag is-primary" >
                    {{file.name}}
                    <button class="delete is-small"
                        type="button"
                        @click="deleteDropFile(index)">
                    </button>
                </span>
            </div>
        </div>

        <div class="columns is-centered">
            <div class="column is-9">
                <div class="field">
                    <label class="label">Category</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select>
                                <option>Select dropdown</option>
                                <option>With options</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Product Title</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Product Title">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Price</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Price">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Product Description</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="Product Description"></textarea>
                    </div>
                </div>
                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link">List It!</button>
                    </div>
                    <div class="control">
                        <button class="button is-link is-light">Cancel</button>
                    </div>
                </div>
            </div>

        </div>


        <br>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                dropFiles: []
            }
        },
        methods: {
            deleteDropFile(index) {
                this.dropFiles.splice(index, 1)
            }
        }
    }
</script>