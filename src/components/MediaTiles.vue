<template>
<div class="media-tiles">
  <div class="container-fluid">
    <div class="row">
      <div 
        class="media-tiles_item col-12 col-md-6 p-0" 
        v-for="item in data.items" 
        :key="item.id"
        :class="(`col-lg-${( item.colDesk ?  item.colDesk : '4' )} media-tiles_item-${( item.type )}`)"
        >
        <div>
          <template v-if="item.type === 'gallery'">
            <a :href="item.src" class="media-tiles_item_href" target="_blank">
              <g-image v-if="item.image" class="media-tiles_item_img" :src="item.image"/>
              <div class="media-tiles_item_overlay d-flex align-items-center justify-content-center text-center">
                <div class="media-tiles_item_overlay_tile">
                  <span class="h1 d-inline-block mb-1 icon-facebook-square"></span>
                  <div class="h4" v-if="item.title">{{item.title}}</div>
                </div>
              </div>
            </a>
          </template>

          <template v-if="item.type === 'youtube'">
            <youtube-video v-if="item.src" :src="item.src"></youtube-video>
          </template>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import YoutubeVideo from "@/components/YoutubeVideo"

export default {
    props: {
        mediaTilesData: {
          type: Object,
          required: true
        }
    },
    components: {
      YoutubeVideo
    },
    data() {
      return {
        activeItem: null,
        };
    },
    computed:{
      },
    methods: {
        classObject(col) {
          debugger
          var result = false;
          if (col) { result = col }
          return result
        },
        selectItem(i) {
            this.activeItem = i;
        },
    },
    created() {
      this.data = this.$props.mediaTilesData;
    },
    mounted() {
      // debugger
    }
}
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";

.media-tiles {
  background-color: $black;
  &_item {
    position: relative;
    @include transition(all linear .15s);
    &_img {
      width: 100%;
    }
    &_overlay {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      opacity: 0;
      background-color: rgba($black, 0);
      @include transition(all linear .15s);
      color: $white;
      &:hover {
        opacity: 1;
        background-color: rgba($black, .3);
      }
      @include media-breakpoint-down(lg) {
        opacity: 1;
      }
    }
    &-youtube {
      opacity: 1;
      &:hover {
        opacity: .7;
      }
    }
  }
  @include media-breakpoint-down(lg) {}
}

</style>
