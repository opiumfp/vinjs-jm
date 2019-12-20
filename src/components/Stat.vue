<template>
<section class="stat" :id="data.id">
  <div v-if="data.image" class="stat_bg">
    <div class="stat_bg_wrap">
      <div class="stat_bg_prlx" v-prlx="{ fromBottom: true }">
      <!-- <div> -->
        <g-image v-if="data.image" class="stat_bg_img stat_bg_img-landscape" :src="data.image"/>
        <g-image v-if="data.imagePt" class="stat_bg_img stat_bg_img-portrait" :src="data.imagePt"/>
      </div>
    </div>
  </div>
  <div class="container pt-5 pb-5">
    <div class="row justify-content-center">
      <div v-for="item in data.items" :key="item.id" :class="`stat_col col-12 col-lg-${colWidth} pt-3 pb-3 pt-lg-5 pb-lg-5`">
        <div class="stat_item text-center">
          <h3 class="stat_title" v-if="item.title">{{ item.title }}</h3>
          <p class="stat_paragraph" v-if="item.paragraph">
            <vue-markdown>{{item.paragraph}}</vue-markdown>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
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
    methods: {
    },
    created() {
      const cols = 12;
      this.data = this.$props.statData
      this.colWidth = cols;

      if (this.data.items.length) {
        this.colWidth = Math.floor(cols/this.data.items.length);
      }
    },
    mounted() {
      // debugger
    },
    methods: {},
}
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";
.stat {
  color: $white;
  position: relative;
  background-color: $black;
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
        background-color: rgba($black, .5);
      }
    }
  }
  @include media-breakpoint-down(lg) {}
}

</style>
