<template>
<div class="media-tiles">
  <!-- <div class="hero_wrapper">
    <div class="hero_bg">
      <g-image v-if="$props.heroData.image" class="hero_bg_image hero_bg_image-landscape" :src="$props.heroData.image"/>
      <g-image v-if="$props.heroData.imagePt" class="hero_bg_image hero_bg_image-portrait" :src="$props.heroData.imagePt"/>
    </div>
    <div class="hero_content">
      <h1 v-if="$props.heroData.title" class="hero_title">{{$props.heroData.title}}</h1>
      <h2 v-if="$props.heroData.subtitle" class="hero_subtitle">{{$props.heroData.subtitle}}</h2>
      <a v-if="$props.heroData.button.link" :href="$props.heroData.button.link" class="btn btn-success my-2 my-sm-0">{{$props.heroData.button.title}}</a>
    </div> -->
  <!-- </div> -->
</div>
</template>

<script>

export default {
    props: {
        mediaTilesData: {
          type: Object,
          required: true
        }
    },
    mounted() {
      // debugger
    },
    methods: {},
}
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";
.media-tiles {
  @include media-breakpoint-down(lg) {}
}

</style>
