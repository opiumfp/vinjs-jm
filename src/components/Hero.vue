<template>
<div class="hero">
  <div class="hero_wrapper">
    <div class="hero_bg">
      <g-image v-if="$props.heroData.image" class="hero_bg_image hero_bg_image-landscape" :src="$props.heroData.image"/>
      <g-image v-if="$props.heroData.imagePt" class="hero_bg_image hero_bg_image-portrait" :src="$props.heroData.imagePt"/>
    </div>
    <div class="hero_content">
      <h1 v-if="$props.heroData.title" class="hero_title">{{$props.heroData.title}}</h1>
      <h2 v-if="$props.heroData.subtitle" class="hero_subtitle">{{$props.heroData.subtitle}}</h2>
      <a v-if="$props.heroData.button.link" :href="$props.heroData.button.link" class="btn btn-success my-2 my-sm-0">{{$props.heroData.button.title}}</a>
    </div>
  </div>
      <!-- <g-image v-if="$props.heroData.image" class="hero_bg_image" :src="$props.heroData.image"/> -->
</div>
</template>

<script>

export default {
    props: {
        heroData: {
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
.hero {
  &_wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: $dark;
  }
  &_bg {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0,0,0,.3);
      background-image: url('../../assets/images/misc/grid_stripes_horizontal.png');
    }
    &_image {
      position: absolute;
      transform: translate(-50%, -50%);
      min-width: 100%;
      min-height: 100%;
      top: 50%;
      left: 50%;
      &-portrait {
        display: none;
      }
      @include media-breakpoint-down(md) {
        @media (orientation: portrait) {
          &-landscape {
            display: none;
          }
          &-portrait {
            display: block;
          }
        }
      }
    }
  }
  &_content {
    position: absolute;
    color: $white;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    text-align: center;
  }
  @include media-breakpoint-down(lg) {
  }
}

</style>
