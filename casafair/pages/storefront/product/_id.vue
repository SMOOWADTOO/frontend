<template>
    <section class="container px-3 my-5">
        <div class="columns">
            <div class="column is-8">
                <figure class="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                    <p class="is-overlay mx-5 is-size-4-desktop is-size-3-touch" style="margin-top: 60%;">
                        Product Name
                    </p>
                </figure>
                <hr>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div class="column is-4">
                <ShopCard :price="4.50"/>   
            </div>
        </div>
    </section>
</template>