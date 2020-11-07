<template>
    <b-carousel :indicator-inside="false"> 
        <b-carousel-item>
            <span class="image">
              <img src="@/assets/images/carousel_img.png">
            </span>
        </b-carousel-item>
        <b-carousel-item>
            <span class="image">
              <img src="@/assets/images/discover.png">
            </span>
        </b-carousel-item>
        <b-carousel-item>
            <span class="image is-4by3">
              <img src="@/assets/images/boss.png">
            </span>
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