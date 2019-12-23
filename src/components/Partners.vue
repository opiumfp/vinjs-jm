<template>
<div class="partners">
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <div 
        v-for="item in data.items" 
        :key="item.id" 
        :set="partner = getJSONData(item.fields)"
        class="stat_col col-12 col-lg-3">

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
