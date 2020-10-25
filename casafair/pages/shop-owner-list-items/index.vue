<template>
    <section>
        <br>
        <div class="columns is-centered is-vcentered">
            <div class="column is-3">
                <figure class="image">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                </figure>
            </div>
            <div class="column is-3">
                <figure class="image">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                </figure>
            </div>
            <div class="column is-3">
                <figure class="image">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                </figure>
            </div>
        </div>

        <div class="columns is-centered">
            <div class="column is-9">
                <div class="field">
                    <label class="label">Subject</label>
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