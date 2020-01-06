<template>
<div class="stat">
  <div v-if="data.image" class="stat_bg">
    <div class="stat_bg_wrap">
      <div class="stat_bg_prlx" v-prlx="{ fromBottom: true,  disabled: isNotPrlx }">
      <!-- <div> -->
        <g-image v-if="data.image" class="stat_bg_img stat_bg_img-landscape" :src="data.image" immediate="true"/>
        <g-image v-if="data.imagePt" class="stat_bg_img stat_bg_img-portrait" :src="data.imagePt"/>
      </div>
    </div>
  </div>
  <div class="container pt-6 pb-6">
    <div class="row justify-content-center">
      <div v-for="item in data.items" :key="item.id" :class="`stat_col col-12 col-lg-${colWidth}`">
        <div class="stat_item text-center">
          <div class="h3 stat_title mb-4" v-if="item.title"><span>{{ item.title }}</span></div>
          <p class="stat_paragraph" v-if="item.paragraph">
            <vue-markdown>{{item.paragraph}}</vue-markdown>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { isMobile, isIE, isBrowser, isEdge } from 'mobile-device-detect'

import VueMarkdown from 'vue-markdown'

import Vue from 'vue'
import VuePrlx from 'vue-prlx'
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
    data () {
      return {
        isBrowser: isBrowser,
        isMobile: isMobile,
        isEdge: isEdge,
        isIE: isIE
      }
    },
    created() {
      this.isNotPrlx = (this.isEdge || this.IE);

      const cols = 12;
      // this.data = this.$props.statData
      this.colWidth = cols;

      if (this.data.items.length) {
        this.colWidth = Math.floor(cols/this.data.items.length);
      }
    },
    mounted() {
      // debugger
    },
    computed: {
      data() {
        return this.$props.statData
      }
    },
}
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";

$circle: $spacer*12;

.stat {
  color: $white;
  position: relative;
  background-color: $black;
  &_title {
    position: relative;
    height: $circle;
    width: $circle;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    &:after {
      content: '';
      border: 1px solid white;
      background-color: rgba($white, .15);
      position: absolute;
      width: $circle;
      height: $circle;
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
  &_col {}
  &_paragraph {}
  &_bg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    &_prlx {
      transition: none!important;
    }
    &_img {
      width: 100%;
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
    &_wrap {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba($dark, .4);
      }
    }
  }
  @include media-breakpoint-down(lg) {}
}

</style>
