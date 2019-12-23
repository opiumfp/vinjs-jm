<template>
<div class="partners">
  <div class="container">
    <carousel 
      v-if="mode === 'carousel'"
      :perPageCustom="[[320, 1], [768, 3], [1024, 4], [1199, 4]]"
      :navigationEnabled="true"
      :navigationClickTargetSize="8"
      :center="true" 
      :mouse-drag="false"
      class=""
      >
      <slide 
          v-for="item in data.items" 
          :key="item.id" 
          :set="partner = getJSONData(item.fields)"
          class="d-flex justify-content-center align-items-center">

          <div v-if="item.active" class="">
            <a :href="partner.src">
              <g-image v-if="partner.image" class="" :src="item.image"/>
            </a>
          </div>
      </slide>
    </carousel>
    <div v-else class="row justify-content-center align-items-center">
      <div 
        v-for="item in data.items" 
        :key="item.id" 
        :set="partner = getJSONData(item.fields)"
        class="stat_col col-12 col-sm-6 col-md-4 col-lg-3">

        <div v-if="item.active" class="partners_item text-center pb-4">
          <a :href="partner.src">
            <g-image v-if="partner.image" class="partners_bg_img" :src="item.image"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import Vue from 'vue';
import VueCarousel from 'vue-carousel';

import { Carousel, Slide } from 'vue-carousel'

export default {
    props: {
      mode: {
        type: String,
        required: false
      },
      partnersData: {
        type: Object,
        required: true
      }
    },
    components:{
      Carousel,
      Slide
    },
    mounted() {
      // debugger
    },
    computed: {
      data() {
        return this.$props.partnersData
      }
    },
    methods: {
      getJSONData: (str) => {
        return JSON.parse(str);
      }
    },
}
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";
.partners {
  
  @include media-breakpoint-down(lg) {}
}

</style>
