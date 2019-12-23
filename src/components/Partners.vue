<template>
<div class="partners">
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <div 
        v-for="item in data.items" 
        :key="item.id" 
        :set="partner = getJSONData(item.fields)"
        class="stat_col"
        :class="getBlockSizes(mode)">

        <div v-if="item.active" class="partners_item text-center pb-4 px-1">
          <a :href="partner.src">
            <g-image v-if="partner.image" class="partners_img" :src="item.image"/>
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
      mode: {
        type: String,
        required: false
      },
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
      getBlockSizes: (mode) => {
        let result = ''

        switch (mode) {
          case 'xlarge': result = 'col-12 col-sm-6 col-md-4 col-lg-3'
          break;
          case 'large': result = 'col-12 col-sm-4 col-md-3 col-lg-2'
          break;
        }

        return result
      }
    },
}
</script>

<style scoped lang="scss">
@import "assets/styles/base.scss";
.partners {
  &_img{
    max-width: 100%;
  }
  @include media-breakpoint-down(lg) {}
}

</style>
