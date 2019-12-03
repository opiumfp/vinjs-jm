<template>
<div class="hero">
  <div class="hero_wrapper">
    <div class="hero_bg">
      <g-image v-if="$props.heroData.image" class="hero_bg_image" :src="$props.heroData.image"/>
    </div>
    <div class="hero_content">
      <h1 v-if="$props.heroData.title" class="hero_title">{{$props.heroData.title}}</h1>
      <h2 v-if="$props.heroData.subtitle" class="hero_subtitle">{{$props.heroData.subtitle}}</h2>
      <a v-if="$props.heroData.button.link" :href="$props.heroData.button.link" class="btn btn-success my-2 my-sm-0">{{$props.heroData.button.title}}</a>
    </div>
  </div>
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
  }
  &_bg {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: url('../../assets/images/misc/grid_stripes_left.png');
      opacity: 0.5;
    }
    &_image {
      position: absolute;
      transform: translate(-50%, -50%);
      min-width: 100%;
      min-height: 100%;
      top: 50%;
      left: 50%;
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
