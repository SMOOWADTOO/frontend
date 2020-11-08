<template>
    <b-carousel>
        <b-carousel-item v-for="img in imgUrls" v-bind:key="img">
            <!-- <section :class="`hero is-medium`" :style="{backgroundImage: 'url(~' + img + ')' }"> -->
            <section :class="`hero is-medium`" style="background-image: 'url(~@/assets/images/carousel_img.png)">
                <div class="hero-body has-text-centered" >
                    <!-- <h1 class="title">{{carousel.text}}</h1> -->
                </div>
            </section>
        </b-carousel-item>
    </b-carousel>
</template>

<script>
export default {
    data() {
        return {
            imgUrls: [
                "@/assets/images/carousel_img.png",
                "@/assets/images/discover.png",
                "@/assets/images/boss.png"
            ], 
            
        }
    },
    methods: {
      getImgUrl(value) {
          console.log(value); 
          return this.imgUrls[value-1]
      }
    }
}
</script>

<style>
.is-active .al img {
    filter: grayscale(0%);
}
.al img {
    filter: grayscale(100%);
}
</style>