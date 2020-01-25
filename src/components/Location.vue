<template>
  <div class="location">
    <div class="location_head mb-4">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-6 text-center">
            <address>
              <span>Location:</span>
              <a
                class="lead"
                href="http://butterfly.vn.ua/"
                target="_blank"
              >Recreation base "Butterfly"</a>
              <br />
              <span>20km Khmel'nyts'ke hwy, Sadove, Ukraine</span>
            </address>
          </div>
        </div>
      </div>
    </div>
    <div class="location_content">
      <div v-if="data.image" class="location_bg">
        <div class="location_bg_wrap">
          <div class="location_bg_prlx" v-prlx="{ fromBottom: true, disabled: device.noPrlx }">
            <g-image
              v-if="data.image"
              class="location_bg_img location_bg_img-landscape"
              :src="data.image"
              alt="VinnytsiaJS - Butterfly"
            />
            <g-image
              v-if="data.imagePt"
              class="location_bg_img location_bg_img-portrait"
              :src="data.imagePt"
              alt="VinnytsiaJS - Butterfly"
            />
          </div>
        </div>
      </div>
      <div class="location_map">
        <div class="container-fluid pt-4 pb-4 pt-lg-5 pb-lg-5">
          <div class="row justify-content-center">
            <a
              href="http://butterfly.vn.ua/"
              target="_blank"
              v-if="data.logo"
              class="col-8 text-center mb-4 mb-lg-5"
            >
              <g-image class="location_logo" :src="data.logo" />
            </a>
          </div>
          <div class="row justify-content-md-center">
            <div class="col-12 col-md-10 p-0">
              <!-- <iframe width="100%" height="450" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" :src="data.mapLinkIframe"></iframe> -->
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d166582.16801339688!2d28.17665828754939!3d49.27930813095509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x472d5b3c078b4b0f%3A0x56d1766af88db234!2z0JLQuNC90L3QuNGG0LAsINCS0ZbQvdC90LjRhtGPLCDQktGW0L3QvdC40YbRjNC60LAg0L7QsdC70LDRgdGC0YwsIDIxMDAw!3m2!1d49.239428!2d28.510665099999997!4m5!1s0x472d652c320f0057%3A0x689995ceead9496b!2z0JHQsNGC0YLQtdGA0YTQu9GP0LksINCh0LDQtNC-0LLQvtC1!3m2!1d49.3252958!2d28.1269016!5e0!3m2!1sru!2sua!4v1577965525920!5m2!1sru!2sua"
                width="100%"
                height="450"
                frameborder="0"
                style="border:0;"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

// <address>Recreation base "Butterfly", 20km Khmel'nyts'ke hwy, Sadove, Ukraine</address>
// <a href="tel:+380636310436">+38 063 63 104 36</a><span>(Partnership)</span>
// <a href="tel:+380632007748">+38 063 200-77-48</a><span>(Transfer)</span>
// <a href="mailto:info@vinnytsiajs.org">info@vinnytsiajs.org</a>

<script>
import { store } from "~/stores/store";

export default {
  props: {
    locationData: {
      type: Object,
      required: true
    }
  },
  computed: {
    device() {
      return store.device;
    },
    data() {
      return this.$props.locationData;
    }
  }
};
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";

.location {
  &_content {
    position: relative;
  }
  &_logo {
    max-width: 100%;
  }
   &_bg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    &_prlx {
      transition: none!important;
      @include media-breakpoint-down(lg) {
        transform: none!important;
      }
    }
    &_img {
      width: 100%;
      &-portrait {
        display: none;
      }
      @include media-breakpoint-down(lg) {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
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
    &_wrap {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      min-height: 100%;
      @include media-breakpoint-down(lg) {
        min-width: 100%;
        min-height: 100%;
      }
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: $overlay-bg;
      }
    }
  }
  &_map {
    position: relative;
    &_link {
      position: absolute;
      bottom: 1em;
      left: 2em;
      &_img {
      }
    }
  }

  @include media-breakpoint-down(lg) {
  }
}
</style>
