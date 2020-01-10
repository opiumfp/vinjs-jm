<template>
  <div class="media-tiles">
    <div class="container-fluid">
      <div class="row">
        <div
          class="col-12 col-md-6 p-0"
          v-for="item in data.items"
          :key="item.id"
          :class="(`col-lg-${( item.colDesk ?  item.colDesk : '4' )}`)"
        >
          <div class="media-tiles_item" :class="(`media-tiles_item-${( item.type )}`)">
            <template v-if="item.type === 'gallery' || item.type ===  'youtubePopup'">
              <a
                :href="item.src"
                class="media-tiles_item_href"
                target="_blank"
                @click="linkClick($event, item.type, item.src)"
              >
                <g-image v-if="item.image" class="media-tiles_item_img" :src="item.image" />
                <div
                  class="media-tiles_item_overlay d-flex align-items-center justify-content-center text-center"
                >
                  <div class="media-tiles_item_overlay_tile">
                    <span
                      v-if="item.type === 'gallery'"
                      class="h1 d-inline-block mb-1 icon-facebook-square"
                    ></span>
                    <span
                      v-if="item.type === 'youtubePopup'"
                      class="h1 d-inline-block mb-1 icon-youtube-play"
                    ></span>
                    <div class="h4" v-if="item.title">{{item.title}}</div>
                  </div>
                </div>
              </a>
            </template>

            <!-- <template v-if="item.type === 'youtube'">
              <youtube-video :src="item.src"></youtube-video>
            </template> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "~/stores/store";
// import YoutubeVideo from "@/components/YoutubeVideo";

export default {
  props: {
    mediaTilesData: {
      type: Object,
      required: true
    }
  },
  components: {
    // YoutubeVideo
  },
  data() {
    return {
      activeItem: null
    };
  },
  computed: {
    data() {
      return this.$props.mediaTilesData;
    },
    device() {
      return store.device;
    }
  },
  methods: {
    getYoutubeID(url) {
      let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      let match = url.match(regExp);
      return match && match[7].length == 11 ? match[7] : false;
    },
    classObject(col) {
      var result = false;
      if (col) {
        result = col;
      }
      return result;
    },
    selectItem(i) {
      this.activeItem = i;
    },
    linkClick(e, type, src) {
      if (type === "youtubePopup" && !this.device.isMobile) {
        e.preventDefault();
        console.log(this.getYoutubeID(src));
        this.$parent.loadPopupVideo(this.getYoutubeID(src));
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";

.media-tiles {
  &_item {
    position: relative;
    overflow: hidden;
    background-color: $dark;
    @include transition(all ease-in-out 0.15s);
    &:hover {
      .media-tiles_item_img {
        transform: scale(1.1);
      }
    }
    &_img {
      width: 100%;
      @include transition(all ease-in-out 0.3s);
    }
    &_overlay {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      // opacity: 1;
      background-color: rgba($dark, 0.4);
      @include transition(all linear 0.2s);
      color: $white;
      &:hover {
        opacity: 1;
        background-color: rgba($dark, 0.3);
      }
      @include media-breakpoint-down(lg) {
        opacity: 1;
      }
    }
    &-youtube .youtube-video {
      opacity: 0.7;
      &:hover {
        opacity: 0.9;
      }
    }
  }
  @include media-breakpoint-down(lg) {
  }
}
</style>
