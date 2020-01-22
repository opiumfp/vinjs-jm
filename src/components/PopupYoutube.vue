<template>
  <div class="popup" :class="{'popup-closed': popupClosed}">
    <div class="popup_overlay" @click="closePopup()"></div>
    <div class="popup_body">
      <div class="popup_wrap">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="popup_video">
                <button
                  type="button"
                  class="btn btn-default p-0 text-white popup_video_close-btn"
                  aria-label="Right Align"
                  @click="closePopup()"
                >
                  <span class="icon-close"></span>
                </button>
                <youtube ref="youtube" :video-id="videoId" @playing="playing"></youtube>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueYoutube from "vue-youtube";

Vue.use(VueYoutube);

export default {
  props: {
    youtubeId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      videoId: this.$props.youtubeId,
      popupClosed: false,
      playerVars: {
        autoplay: 1
      }
    };
  },
  created() {
    // this.videoId = this.$props.videoId;
  },
  mounted() {
    // debugger
    if (!this.popupClosed) {
      this.showPopup()
      this.playVideo();
    };
  },
  methods: {
    showPopup() {
      this.popupClosed = false;
      document.querySelector('body').classList.add('body-blurred');
    },
    closePopup() {
      this.popupClosed = true;
      this.stopVideo();
      document.querySelector('body').classList.remove('body-blurred');
    },
    playing() {
      console.log("o/ we are watching!!!");
    },
    playVideo() {
      this.$refs.youtube.player.playVideo();
    },
    stopVideo() {
      this.$refs.youtube.player.stopVideo();
    },
    loadVideo(id) {
      this.showPopup();
      this.$refs.youtube.player.loadVideoById(id);
    }
  }
};
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";
$indent: -1.5em;

.popup {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10001;
  &-closed {
    display: none;
  }
  &_overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba($dark, 0.5);
  }
  &_body {
    position: absolute;
    // background-color: $body-bg;
    top: calc(50% - #{$nav-height/2});
    left: 50%;
    transform: translate(-50%, -50%);
    width: 130vh;
    max-width: 130vh;
    max-height: 100vw;
  }
  &_video {
    width: 100%;
    padding-top: 56.25%;
    position: relative;
    background-color: $black;
    ::v-deep & iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &:before {
      content: "";
      position: absolute;
      top: $indent;
      left: $indent;
      right: $indent;
      bottom: $indent;
      background-color: rgba($dark, 0.5);
    }
    &_close-btn {
      position: absolute;
      width: 1.5em;
      height: 1.5em;
      right: $indent/1.1;
      top: $indent/1.1;
    }
  }
  @include media-breakpoint-down(lg) {
  }
}
</style>