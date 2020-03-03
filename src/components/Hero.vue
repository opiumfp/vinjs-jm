<template>
  <div class="hero">
    <div class="hero_wrapper">
      <div class="hero_bg">
        <template v-if="!device.isShowVideo">
          <g-image
            v-if="$props.heroData.image"
            class="hero_bg_image hero_bg_image-landscape"
            :src="$props.heroData.image"
            alt="Vinnytsia JS - Javascript Open Air"
          />
        </template>
        <template v-else>
          <video
            ref="herovideo"
            class="hero_bg_video"
            muted="muted"
            loop="loop"
          >
            <source src="../../assets/videos/vjs19.mp4" type="video/mp4" />
            <source src="../../assets/videos/vjs19.ogg" type="video/ogg" />
            <source src="../../assets/videos/vjs19.webm" type="video/webm" />
          </video>
        </template>
        <g-image
          v-if="$props.heroData.imagePt"
          class="hero_bg_image hero_bg_image-portrait"
          :src="$props.heroData.imagePt"
          alt="Vinnytsia JS - Javascript Open Air"
        />
      </div>
      <div class="hero_content pt-4">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h2 v-if="$props.heroData.date" class="h3 hero_date text-uppercase font-weight-bold">{{this.$props.heroData.date}}</h2>
              <img
                class="hero_logo d-block mx-auto my-4"
                src="../../assets/images/logo/VinnytsiaJS_20-logo-sm.png"
                alt="VinnytsiaJS - Javascript Open Air Conference"
              />
              <h2 class="h1 hero_subtitle text-uppercase font-weight-bold">Javascript Open Air</h2>
              <div class="h1 hero_subtitle-pt text-uppercase font-weight-bold">Javascript<br>Open Air</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { store } from "~/stores/store";

export default {
  props: {
    heroData: {
      type: Object,
      required: true
    }
  },
  components : {
    VueMarkdown
  },
  computed: {
    device() {
      return store.device;
    }
  },
  mounted() {
    this.herovideo = this.$refs.herovideo;

    if (this.device.isShowVideo) {
      this.herovideo.play();

      let videoHide = false;
      let windowHeight = window.innerHeight;

      window.addEventListener("scroll", () => {
        if (window.scrollY < windowHeight) {
          if (!videoHide) return false;
          this.herovideo.play();
          videoHide = false;
        } else if (!videoHide) {
          this.herovideo.pause();
          videoHide = true;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";
.hero {
  height: 100vh;
  &_wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: $black;
    html.browser:not(.edge):not(.ie) & {
      position: fixed;
    }
  }
  &_content {
    position: absolute;
    color: $white;
    transform: translate(-50%, -50%);
    width: 100%;
    top: calc(50% - #{$nav-height/2});
    left: 50%;
    text-align: center;
    @include media-breakpoint-down(lg) {
      top: 50%;
  
    }
  }
  &_date {
    @include media-breakpoint-down(lg) {
      @media (orientation: landscape) {
        font-size: 5vh;
      }
      @media (orientation: portrait) {
        font-size: 4vh;
      }
    }
  }
  &_subtitle {
    &-pt {
      display: none;
    }
    @include media-breakpoint-down(lg) {
      @media (orientation: portrait) {
        display: none;
        &-pt {
          display: block;
        }
      }
    }
    @media (orientation: landscape) {
      ::v-deep br {
        display: none;
      }
    }
    @include media-breakpoint-down(lg) {
      @media (orientation: landscape) {
        font-size: 6vh;
      }
      @media (orientation: portrait) {
        font-size: 5.5vh;
      }
    }
  }
  &_logo {
    max-width: 100%;
    width: calc(65vh - #{$nav-height});
    min-height: calc(65vh - #{$nav-height});
    @include media-breakpoint-down(lg) {
      min-height: 0;
      @media (orientation: portrait) {
        width: 40vh;
        max-width: 100%;
        max-height: 70vh;
      }
      @media (orientation: landscape) {
        width: 45vh;
        max-height: 45vh;
      }
    }
  }
  &_bg {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: url("../../assets/images/misc/grid_stripes_horizontal.png");
      background-repeat: repeat;
      background-color: $overlay-bg;
    }
    &_video {
      display: none;
      html.browser:not(.ie):not(.edge) & {
        display: block;
      }
    }
    &_video {
      min-width: 100%;
      min-height: 100vh;
      transform: translateX(-50%);
      position: relative;
      left: 50%;
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
          html.mobile &-portrait {
            display: block;
            width: auto;
          }
        }
      }
    }
  }

  @include media-breakpoint-down(lg) {
  }
}
</style>
