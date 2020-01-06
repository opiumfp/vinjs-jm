<template>
<div class="hero">
  <div class="hero_wrapper">
    <div class="hero_bg">
      <video
        ref="herovideo"
        v-if="isVideoShow"
        class="hero_bg_video"
        src="../tmp/vjs19.mp4"
        muted="muted"
        loop="loop"
      >
        <!-- autoplay="autoplay" -->
        <source src="../tmp/vjs19.mp4" type="video/mp4">
        <source src="../tmp/vjs19.ogg" type="video/ogg">
        <source src="../tmp/vjs19.webm" type="video/webm">
      </video>
      <g-image v-if="!isVideoShow && $props.heroData.image" class="hero_bg_image hero_bg_image-landscape" :src="$props.heroData.image"/>
      <g-image v-if="$props.heroData.imagePt" class="hero_bg_image hero_bg_image-portrait" :src="$props.heroData.imagePt"/>
    </div>
    <div class="hero_content pt-4">
      <!-- <h1 v-if="$props.heroData.title" class="hero_title">{{$props.heroData.title}}</h1> -->
      <!-- <h2 v-if="$props.heroData.subtitle" class="h3 hero_subtitle">{{$props.heroData.subtitle}}</h2> -->
      <h2 class="h3 text-uppercase">July 25, 2020</h2>
      <g-image class="hero_logo d-block mx-auto my-4" src="../../assets/images/logo/vinnytsiajs-logo.svg" immediate="true"/>
      <h2 class="h1 text-uppercase">Javascript Open Air</h2>
      <!-- <a v-if="$props.heroData.button.link" :href="$props.heroData.button.link" class="btn btn-success my-2 my-sm-0">{{$props.heroData.button.title}}</a> -->
    </div>
  </div>
      <!-- <g-image v-if="$props.heroData.image" class="hero_bg_image" :src="$props.heroData.image"/> -->
</div>
</template>

<script>

import { isMobile, isIE, isBrowser, isEdge } from 'mobile-device-detect'

export default {
    props: {
        heroData: {
          type: Object,
          required: true
        }
    },
    data () {
      return {
        isBrowser: isBrowser,
        isMobile: isMobile,
        isEdge: isEdge,
        isIE: isIE
      }
    },
    mounted() {
      const showVideo = (this.isBrowser && !this.isIE && !this.isEdge);
      const herovideo = this.$refs.herovideo;

      if (showVideo) {
        herovideo.play();

        let videoHide = false;
        let windowHeight = window.innerHeight;

        window.addEventListener('scroll', () => {
            if ( window.scrollY < windowHeight ) {
              
              if (!videoHide) return false;
              console.log('HIDE')

              document.querySelector('body').classList.remove('hero-hide')
              herovideo.play();
              videoHide = false;
            } else if (!videoHide) {
              console.log('SHOW')
              document.querySelector('body').classList.add('hero-hide')
              herovideo.pause();
              videoHide = true;
            }
        });
      }


    },
    methods: {
      isVideoShow: () => {
        return (this.isBrowser && !this.isIE && !this.isEdge)
      }
    },
}
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";
.hero {
  height: 100vh;
  &_wrapper {
    .hero-hide & {
      display: none;
      // visibility: hidden;
      // z-index: -100;
    }
    // position: fixed;
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: $black;
  }
  &_logo {
    width: calc(70vh - #{$nav-height});
    // opacity: 0;
  }
  &_bg {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      // background-image: url('https://vinjs.netlify.com/assets/static/vinnytsiajs-logo.bf5654a.38eacaf72fc68115816616ecfa921a28.svg'), url('../../assets/images/misc/grid_stripes_horizontal.png');
      // background-position: 50% 60%, 0 0;
      // background-attachment: fixed, scroll;
      // background-size: 60vh, auto;
      // background-repeat: no-repeat, repeat;


      background-image: url('../../assets/images/misc/grid_stripes_horizontal.png');
      background-repeat: repeat;

      background-color: rgba($dark, .4);
    }
    &_video {
      html.mobile &,
      html.edge &,
      html.ie & {
        display: none;
      }
    }
    &_video,
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
    // top: calc(50% - $navbar-h);
    top: calc(50% - #{$nav-height/2});
    left: 50%;
    text-align: center;
  }
  @include media-breakpoint-down(lg) {
  }
}

</style>
