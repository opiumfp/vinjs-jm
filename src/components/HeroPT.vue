<template>
  <div class="heropt">
    <div class="heropt_wrapper">
      <div class="heropt_bg">
        <!-- <template v-if="!device.isShowVideo"> -->
        <template>
          <g-image
            v-if="$props.heroPTData.image"
            class="heropt_bg_image heropt_bg_image-landscape"
            :src="$props.heroPTData.image"
            alt="Vinnytsia JS - Javascript Open Air"
          />
        </template>
        <!-- <template v-else>
          <video
            ref="herovideo"
            class="heropt_bg_video"
            muted="muted"
            loop="loop"
          >
            <source src="../../assets/videos/vjs19.mp4" type="video/mp4" />
            <source src="../../assets/videos/vjs19.ogg" type="video/ogg" />
            <source src="../../assets/videos/vjs19.webm" type="video/webm" />
          </video>
        </template> -->
        <g-image
          v-if="$props.heroPTData.imagePt"
          class="heropt_bg_image heropt_bg_image-portrait"
          :src="$props.heroPTData.imagePt"
          alt="Vinnytsia JS - Javascript Open Air"
        />
      </div>
      <div class="heropt_content pt-6">
        <div class="container">
          <div class="row">
            <div class="col-12 col-lg-8 text-center text-lg-left">
              <h2 v-if="$props.heroPTData.date" class="h3 heropt_date text-uppercase font-weight-bold text-warning">{{this.$props.heroPTData.date}}</h2>
              <h2 class="h1 heropt_subtitle font-weight-bold">{{$props.heroPTData.title}}</h2>
              <div class="h1 heropt_subtitle-pt text-uppercase font-weight-bold">{{$props.heroPTData.title}}</div>
              <div class="mt-4">
                <a class="btn btn-primary" :href="$props.heroPTData.button.link">{{$props.heroPTData.button.title}}</a>
              </div>
            </div>
            <div class="col-4 d-none d-lg-block">
              <img
                class="heropt_logo d-block mx-auto my-4"
                src="../../assets/images/logo/VinJS_PUB_TALKS-LOGO.png"
                alt="VinnytsiaJS - Javascript Open Air Conference"
              />
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
    heroPTData: {
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
    // this.herovideo = this.$refs.herovideo;

    // if (this.device.isShowVideo) {
    //   this.herovideo.play();

    //   let videoHide = false;
    //   let windowHeight = window.innerHeight;

    //   window.addEventListener("scroll", () => {
    //     if (window.scrollY < windowHeight) {
    //       if (!videoHide) return false;
    //       this.herovideo.play();
    //       videoHide = false;
    //     } else if (!videoHide) {
    //       this.herovideo.pause();
    //       videoHide = true;
    //     }
    //   });
    // }
  }
};
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";
.heropt {
  height: 100vh;
  &_wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: $black;
    // html.browser:not(.edge):not(.ie) & {
    //   position: fixed;
    // }
  }
  &_content {
    position: absolute;
    color: $white;
    transform: translate(-50%, -50%);
    width: 100%;
    top: calc(50% - #{$nav-height/2});
    left: 50%;
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
    // min-height: calc(65vh - #{$nav-height});
    @include media-breakpoint-down(lg) {
      min-height: 0;
      @media (orientation: portrait) {
        width: 40vh;
        max-width: 100%;
        max-height: 70vh;
      }
      @media (orientation: landscape) {
        max-width: 100%;
        height: auto;
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
      // background-image: url("../../assets/images/misc/hero-overlay.svg");
      background-repeat: repeat;
      // background-color: $overlay-bg;
      background-color: rgba(0,0,0,.5);
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
