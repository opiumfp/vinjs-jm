<template>
<section class="stat" :id="data.id">
  <div class="container pt-5 pb-5">
    <div class="row justify-content-center">
      <div v-for="item in data.items" :key="item.id" :class="`col-12 col-lg-${colWidth}`">
        <div class="stat-item">
          <h3 v-if="item.title">{{ item.title }}</h3>
          <p v-if="item.paragraph ">{{ item.paragraph }}</p>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>

export default {
    props: {
        statData: {
          type: Object,
          required: true
        }
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
  background-color: $black;
  color: $white;
  @include media-breakpoint-down(lg) {}
}

</style>
