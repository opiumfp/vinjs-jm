<template>
<div class="partners">
  <div class="container">
    <div class="row justify-content-center">
      <div 
        v-for="item in data.items" 
        :key="item.id" 
        :set="partner = getJSONData(item.parnter)"
        class="stat_col col-12 col-lg-3">
        <div v-if="item.active" class="partners_item text-center">
          <a :href="partner.src">
            <!-- <g-image v-if="partner.image" class="partners_bg_img" :src="getImageSrc()"/> -->
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
    props: {
        partnersData: {
          type: Object,
          required: true
        }
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
      },
      getImageSrc: () => {
        return '/assets/static/uploads/matrica-b.svg'
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
