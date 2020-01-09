<template>
  <div class="popup">
    <div class="popup_overlay"></div>
    <div class="popup_body p-3">
      <div class="popup_wrap p-1">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="popup_video">
                <youtube ref="youtube" :video-id="videoId" @playing="false"></youtube>
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
  },
  methods: {
    playing() {
      console.log("o/ we are watching!!!");
    },
    playVideo() {
      this.$refs.youtube.player.playVideo();
    },
    loadVideo(id) {
      this.$refs.youtube.player.loadVideoById(id);
    }
  }
};
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";

.popup {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10001;
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
    background-color: $body-bg;
    top: 50%;
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
    ::v-deep & iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  @include media-breakpoint-down(lg) {
  }
}
</style>