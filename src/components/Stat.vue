<template>
  <div class="stat">
    {{this.device.isBrowser}}
    <div v-if="data.image" class="stat_bg">
      <div class="stat_bg_wrap">
        <g-image v-if="data.imagePt" class="stat_bg_img stat_bg_img-portrait" :src="data.imagePt" />
        <div class="stat_bg_prlx" v-prlx="{ fromBottom: true,  disabled: device.noPrlx }">
          <g-image
            v-if="data.image"
            class="stat_bg_img stat_bg_img-landscape"
            :src="data.image"
          />
        </div>
      </div>
    </div>
    <div class="container pt-6 pb-6">
      <div class="row justify-content-center">
        <div
          v-for="(item, index) in data.items"
          :key="item.id"
          :class="`stat_col col-12 col-lg-${colWidth}`"
        >
          <div class="stat_item text-center">
            <div class="h3 stat_title mb-2 mb-lg-3" v-if="item.title">
              <vue-markdown>{{ item.title }}</vue-markdown>
            </div>
            <p class="stat_paragraph" v-if="item.paragraph">
              <vue-markdown>{{item.paragraph}}</vue-markdown>
            </p>
            <hr v-if="!(index == data.items.length - 1)" class="stat_hr bg-light w-25 my-4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "~/stores/store";

import VueMarkdown from "vue-markdown";

import Vue from "vue";
import VuePrlx from "vue-prlx";
Vue.use(VuePrlx);

export default {
  props: {
    statData: {
      type: Object,
      required: true
    }
  },
  components: {
    VueMarkdown
  },
  computed: {
    data() {
      return this.$props.statData;
    },
    device() {
      return store.device;
    }
  },
  created() {
    const cols = 12;
    // this.data = this.$props.statData
    this.colWidth = cols;

    if (this.data.items.length) {
      this.colWidth = Math.floor(cols / this.data.items.length);
    }
  }
};
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";

$circle: $spacer * 11;
$circle-sm: $spacer * 10;

.stat {
  color: $white;
  position: relative;
  background-color: $black;
  &_title {
    position: relative;
    ::v-deep p {
      margin: 0;
    }
    @include media-breakpoint-up(lg) {
      height: $circle;
      width: $circle;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      &:after {
        content: "";
        border: 1px solid white;
        background-color: rgba($white, 0.15);
        position: absolute;
        width: $circle;
        height: $circle;
        @media (max-width: 1100px) {
          height: $circle-sm;
          width: $circle-sm;
        }
        transform: translate(-50%, -50%) rotate(15deg);
        border-radius: 50%;
        left: 50%;
        top: 50%;
      }
      & > span {
        position: relative;
        z-index: 1;
      }
    }
  }
  &_hr {
    @include media-breakpoint-up(lg) {
      display: none;
    }
  }
  &_bg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    &_prlx {
      transition: none !important;
      @include media-breakpoint-down(lg) {
        transform: none !important;
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
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: $overlay-bg;
      }
    }
  }
}
</style>
